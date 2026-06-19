const assert = require('node:assert/strict');
const test = require('node:test');
const { CoffeeController, IR } = require('../src/lib/coffee-controller');

class FakeModbus {
  constructor() {
    this.state = {
      cup: 0,
      ready: 1,
      stage: 0,
      rcpState: 0
    };
    this.writes = [];
    this.commandEcho = 0x0000;
    this.failReads = false;
  }

  async readInput(address, quantity) {
    if (this.failReads) throw new Error('timeout');
    if (address === IR.SYS_MODE && quantity === 4) {
      return [0, 0, this.state.ready, this.state.cup];
    }
    if (address === IR.ERR_LAST) return [0];
    if (address === IR.BOILER_TEMP) return [9300, 0, 0, 850, 0, 0, 25];
    if (address === IR.BRW_STAGE) return [this.state.stage, 0, 0, 0, 0, 42];
    if (address === IR.RCP_STATE) return [this.state.rcpState];
    if (address === IR.CMD_READY) return [this.state.ready];
    throw new Error(`unexpected read ${address}:${quantity}`);
  }

  async readHolding() {
    return [this.commandEcho];
  }

  async writeSingle(address, value) {
    this.writes.push([address, value]);
    return true;
  }

  async writeMultiple(address, values) {
    this.writes.push([address, [...values]]);
    return true;
  }
}

test('controller writes profile, args, command, then waits for completion monitoring', async () => {
  const fake = new FakeModbus();
  const controller = new CoffeeController(fake);
  controller.enqueue({ cups: 1, dose: 15, yieldMl: 30, brewer: 0, grinder: 0 });

  await waitFor(() => controller.activeOrder?.state === 'running');

  assert.deepEqual(fake.writes.slice(0, 4), [
    [0x0120, [150, 300]],
    [0x0001, 0],
    [0x0002, 0],
    [0x0000, 0x0005]
  ]);
  assert.equal(controller.activeOrder.message, '제조 중');
});

test('cup removal before RCP_STATE=2 is treated as abnormal', async () => {
  const fake = new FakeModbus();
  const controller = new CoffeeController(fake);
  const order = {
    id: 1,
    state: 'running',
    message: '',
    seenCup: false,
    completionSeen: false,
    retries: 0
  };
  controller.activeOrder = order;

  fake.state.cup = 0x0003;
  fake.state.stage = 7;
  fake.state.rcpState = 1;
  await controller.pollOnce();

  fake.state.cup = 0x0000;
  fake.state.rcpState = 1;
  await controller.pollOnce();

  assert.equal(order.state, 'failed');
  assert.equal(order.message, '완료 전 컵이 빠짐');
  assert.equal(controller.activeOrder, null);
});

test('normal completion requires RCP_STATE=2 first, then cup removal', async () => {
  const fake = new FakeModbus();
  const controller = new CoffeeController(fake);
  const order = {
    id: 2,
    state: 'running',
    message: '',
    seenCup: false,
    completionSeen: false,
    retries: 0
  };
  controller.activeOrder = order;

  fake.state.cup = 0x0003;
  fake.state.stage = 11;
  fake.state.rcpState = 2;
  await controller.pollOnce();

  assert.equal(order.completionSeen, true);
  assert.equal(order.state, 'running');

  fake.state.cup = 0x0000;
  await controller.pollOnce();

  assert.equal(order.state, 'done');
  assert.equal(order.message, '정상 완료');
  assert.equal(controller.activeOrder, null);
});

test('brief poll failures do not immediately mark the connection as lost', async () => {
  const fake = new FakeModbus();
  const controller = new CoffeeController(fake);

  await controller.pollOnce();
  assert.equal(controller.connected, true);

  fake.failReads = true;
  controller.startPolling(10);

  await waitFor(() => controller.consecutivePollErrors >= 1);
  assert.equal(controller.connected, true);

  await waitFor(() => controller.consecutivePollErrors >= 3);
  assert.equal(controller.connected, false);

  controller.stopPolling();
});

async function waitFor(predicate, timeoutMs = 1000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error('condition was not met in time');
}
