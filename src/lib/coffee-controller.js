const { EventEmitter } = require('node:events');

const HR = {
  CMD: 0x0000,
  CMD_ARG1: 0x0001,
  CMD_ARG2: 0x0002,
  DOSE_G: 0x0120,
  YIELD_G: 0x0121
};

const IR = {
  SYS_MODE: 0x0000,
  CMD_READY: 0x0002,
  CUP_STATUS: 0x0003,
  ERR_LAST: 0x0014,
  BOILER_TEMP: 0x0020,
  PRESS_BAR: 0x0023,
  FLOW_RATE: 0x0026,
  BRW_STAGE: 0x0030,
  EXTRACT_TIME: 0x0035,
  RCP_STATE: 0x0090
};

const CMD = {
  STOP_ALL: 0x0002,
  COFFEE_START: 0x0005
};

const STAGES = {
  0: '대기',
  1: '그라인딩',
  2: '레벨링',
  3: '리드 닫힘',
  4: '탬핑',
  5: '준비완료',
  7: '추출',
  8: '퍽 드라이',
  9: '리드 열림',
  10: '와이프',
  11: '복귀'
};

const SYS_MODES = {
  0: '대기',
  1: '커피',
  15: '에러'
};

const POLL_ERROR_DISCONNECT_THRESHOLD = 3;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createEmptyStatus() {
  return {
    sysMode: 0,
    sysModeText: '대기',
    cmdReady: 0,
    cupStatus: 0,
    cupText: '컵 없음',
    errLast: 0,
    boilerTemp: 0,
    pressureBar: 0,
    flowRate: 0,
    stage: 0,
    stageText: '대기',
    extractTime: 0,
    rcpState: 0,
    rcpStateText: '대기',
    updatedAt: null
  };
}

class CoffeeController extends EventEmitter {
  constructor(modbus) {
    super();
    this.modbus = modbus;
    this.status = createEmptyStatus();
    this.queue = [];
    this.activeOrder = null;
    this.processing = false;
    this.pollTimer = null;
    this.pollBusy = false;
    this.orderSeq = 1;
    this.connected = false;
    this.consecutivePollErrors = 0;
    this.lastFinishedOrder = null;
  }

  startPolling(intervalMs = 100) {
    this.stopPolling();
    this.pollTimer = setInterval(() => {
      this.pollOnce().catch((error) => this.#handlePollError(error));
    }, intervalMs);
    return this.pollOnce().catch((error) => this.#handlePollError(error));
  }

  stopPolling() {
    if (this.pollTimer) clearInterval(this.pollTimer);
    this.pollTimer = null;
  }

  async pollOnce() {
    if (this.pollBusy) return this.status;
    this.pollBusy = true;
    try {
      const [base, err, process, stage, recipe] = await Promise.all([
        this.modbus.readInput(IR.SYS_MODE, 4),
        this.modbus.readInput(IR.ERR_LAST, 1),
        this.modbus.readInput(IR.BOILER_TEMP, 7),
        this.modbus.readInput(IR.BRW_STAGE, 6),
        this.modbus.readInput(IR.RCP_STATE, 1)
      ]);

      this.status = {
        sysMode: base[0],
        sysModeText: SYS_MODES[base[0]] ?? `알 수 없음(${base[0]})`,
        cmdReady: base[2],
        cupStatus: base[3],
        cupText: base[3] === 0x0003 ? '컵 있음' : '컵 없음',
        errLast: err[0],
        boilerTemp: process[0] / 100,
        pressureBar: process[3] / 100,
        flowRate: process[6],
        stage: stage[0],
        stageText: STAGES[stage[0]] ?? `알 수 없음(${stage[0]})`,
        extractTime: stage[5] / 10,
        rcpState: recipe[0],
        rcpStateText: recipe[0] === 2 ? '정상완료' : recipe[0] === 1 ? '실행중' : '대기',
        updatedAt: new Date().toISOString()
      };

      this.connected = true;
      this.consecutivePollErrors = 0;
      this.#watchActiveOrder();
      this.#emitState();
      return this.status;
    } finally {
      this.pollBusy = false;
    }
  }

  enqueue({ cups = 1, dose = 15, yieldMl = 30, brewer = 0, grinder = 0 }) {
    const count = Math.max(1, Number(cups) || 1);
    const created = [];
    this.lastFinishedOrder = null;

    for (let i = 0; i < count; i += 1) {
      const order = {
        id: this.orderSeq++,
        dose,
        yieldMl,
        brewer,
        grinder,
        state: 'waiting',
        message: '대기 중',
        createdAt: new Date().toISOString(),
        startedAt: null,
        finishedAt: null,
        seenCup: false,
        completionSeen: false,
        retries: 0
      };
      this.queue.push(order);
      created.push(order);
    }

    this.#emitLog(`${count}잔 주문을 대기열에 추가했습니다.`);
    this.#emitState();
    this.#processQueue().catch((error) => this.#failActive(error));
    return created;
  }

  async cancelActive() {
    if (!this.activeOrder) return false;
    await this.modbus.writeSingle(HR.CMD, CMD.STOP_ALL);
    this.activeOrder.state = 'cancelled';
    this.activeOrder.message = '사용자가 취소함';
    this.activeOrder.finishedAt = new Date().toISOString();
    this.#emitLog(`#${this.activeOrder.id} 주문을 정지했습니다.`);
    this.activeOrder = null;
    this.processing = false;
    this.#emitState();
    this.#processQueue().catch((error) => this.#failActive(error));
    return true;
  }

  clearQueue() {
    const removed = this.queue.length;
    this.queue = [];
    this.#emitLog(`대기 중인 주문 ${removed}잔을 삭제했습니다.`);
    this.#emitState();
    return removed;
  }

  async #processQueue() {
    if (this.processing || this.activeOrder || this.queue.length === 0) return;
    this.processing = true;
    const order = this.queue.shift();
    this.activeOrder = order;
    this.lastFinishedOrder = null;

    try {
      await this.#startOrder(order);
    } catch (error) {
      await this.#failActive(error);
    } finally {
      this.processing = false;
      this.#emitState();
    }
  }

  async #startOrder(order) {
    order.state = 'starting';
    order.message = '프로파일 쓰는 중';
    order.startedAt = new Date().toISOString();
    this.#emitState();

    await this.modbus.writeMultiple(HR.DOSE_G, [
      Math.round(order.dose * 10),
      Math.round(order.yieldMl * 10)
    ]);
    await this.#waitUntilReady();

    for (let attempt = 1; attempt <= 3; attempt += 1) {
      order.retries = attempt - 1;
      order.message = attempt === 1 ? '시작 명령 전송 중' : `거부되어 재시도 중(${attempt}/3)`;
      this.#emitState();

      await this.modbus.writeSingle(HR.CMD_ARG1, order.brewer);
      await this.modbus.writeSingle(HR.CMD_ARG2, order.grinder);
      await this.modbus.writeSingle(HR.CMD, CMD.COFFEE_START);

      const [cmdRegister] = await this.modbus.readHolding(HR.CMD, 1);
      if (cmdRegister === 0x0000) {
        order.state = 'running';
        order.message = '제조 중';
        this.#emitLog(`#${order.id} 주문이 수락되어 제조를 시작했습니다.`);
        this.#emitState();
        return;
      }

      if (cmdRegister !== 0xffff) {
        throw new Error(`알 수 없는 명령 확인값: 0x${cmdRegister.toString(16)}`);
      }

      this.#emitLog(`#${order.id} 주문이 장비에서 거부되었습니다. 다시 시도합니다.`);
      await sleep(700);
      await this.#waitUntilReady();
    }

    throw new Error('장비가 시작 명령을 3번 거부했습니다.');
  }

  async #waitUntilReady(timeoutMs = 12000) {
    const started = Date.now();
    while (Date.now() - started < timeoutMs) {
      const [ready] = await this.modbus.readInput(IR.CMD_READY, 1);
      if (ready & 0x0001) return true;
      await sleep(150);
    }
    throw new Error('새 음료를 받을 준비 상태가 아닙니다.');
  }

  #watchActiveOrder() {
    const order = this.activeOrder;
    if (!order || !['running', 'starting'].includes(order.state)) return;

    if (this.status.cupStatus === 0x0003) {
      order.seenCup = true;
      if (order.state === 'running') order.message = `${this.status.stageText} 진행 중`;
    }

    if (order.seenCup && !order.completionSeen && this.status.cupStatus === 0x0000 && this.status.rcpState !== 2) {
      order.state = 'failed';
      order.message = '완료 전 컵이 빠짐';
      order.finishedAt = new Date().toISOString();
      this.#emitLog(`#${order.id} 주문: 제조 완료 전 컵이 빠져 이상 종료했습니다.`);
      this.activeOrder = null;
      this.#processQueue().catch((error) => this.#failActive(error));
      return;
    }

    if (this.status.rcpState === 2) {
      order.completionSeen = true;
      order.message = '완료 확인, 컵 빠짐 대기';
    }

    if (order.completionSeen && this.status.cupStatus === 0x0000) {
      order.state = 'done';
      order.message = '정상 완료';
      order.finishedAt = new Date().toISOString();
      this.#emitLog(`#${order.id} 주문이 정상 완료되었습니다. 다음 주문을 확인합니다.`);
      this.lastFinishedOrder = { ...order };
      this.activeOrder = null;
      this.#processQueue().catch((error) => this.#failActive(error));
    }
  }

  #handlePollError(error) {
    this.consecutivePollErrors += 1;
    this.connected = this.consecutivePollErrors < POLL_ERROR_DISCONNECT_THRESHOLD;
    if (this.consecutivePollErrors === 1 || this.consecutivePollErrors % 5 === 0) {
      this.#emitLog(`통신 응답 없음: ${error.message}`);
    }
    this.#emitState();
  }

  async #failActive(error) {
    if (this.activeOrder) {
      this.activeOrder.state = 'failed';
      this.activeOrder.message = error.message;
      this.activeOrder.finishedAt = new Date().toISOString();
      this.#emitLog(`#${this.activeOrder.id} 주문 실패: ${error.message}`);
      this.lastFinishedOrder = { ...this.activeOrder };
      this.activeOrder = null;
    } else {
      this.#emitLog(`작업 실패: ${error.message}`);
    }
    this.processing = false;
    this.#emitState();
    this.#processQueue().catch((nextError) => this.#emitLog(`다음 주문 시작 실패: ${nextError.message}`));
  }

  #emitLog(message) {
    this.emit('log', {
      time: new Date().toISOString(),
      message
    });
  }

  #emitState() {
    this.emit('state', this.getSnapshot());
  }

  getSnapshot() {
    const connectionText = this.connected
      ? this.consecutivePollErrors > 0
        ? '응답 지연'
        : '연결됨'
      : '응답 없음';

    return {
      connected: this.connected,
      connectionText,
      status: this.status,
      activeOrder: this.activeOrder,
      lastFinishedOrder: this.lastFinishedOrder,
      queue: this.queue,
      consecutivePollErrors: this.consecutivePollErrors
    };
  }
}

module.exports = {
  CMD,
  CoffeeController,
  HR,
  IR,
  STAGES,
  SYS_MODES,
  createEmptyStatus
};
