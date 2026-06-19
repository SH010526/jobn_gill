const SLAVE_ID = 1;

function crc16Modbus(buffer) {
  let crc = 0xffff;

  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      const lsb = crc & 1;
      crc >>= 1;
      if (lsb) crc ^= 0xa001;
    }
  }

  return crc & 0xffff;
}

function appendCrc(bytes) {
  const payload = Buffer.from(bytes);
  const crc = crc16Modbus(payload);
  return Buffer.concat([payload, Buffer.from([crc & 0xff, (crc >> 8) & 0xff])]);
}

function validateCrc(frame) {
  if (!Buffer.isBuffer(frame) || frame.length < 4) return false;
  const body = frame.subarray(0, frame.length - 2);
  const actual = frame.readUInt16LE(frame.length - 2);
  return crc16Modbus(body) === actual;
}

function word(value) {
  return [(value >> 8) & 0xff, value & 0xff];
}

function buildReadFrame(functionCode, address, quantity) {
  return appendCrc([SLAVE_ID, functionCode, ...word(address), ...word(quantity)]);
}

function buildWriteSingleFrame(address, value) {
  return appendCrc([SLAVE_ID, 0x06, ...word(address), ...word(value)]);
}

function buildWriteMultipleFrame(address, values) {
  const normalized = values.map((value) => Number(value) & 0xffff);
  const bytes = normalized.flatMap((value) => word(value));
  return appendCrc([
    SLAVE_ID,
    0x10,
    ...word(address),
    ...word(normalized.length),
    normalized.length * 2,
    ...bytes
  ]);
}

function expectedReadLength(quantity) {
  return 5 + quantity * 2;
}

function parseReadResponse(frame, quantity) {
  if (!validateCrc(frame)) {
    throw new Error('CRC가 맞지 않는 응답입니다.');
  }
  if (frame[0] !== SLAVE_ID) {
    throw new Error('다른 장비 주소에서 온 응답입니다.');
  }
  if (frame[1] & 0x80) {
    throw new Error(`장비가 Modbus 오류를 반환했습니다. 코드: 0x${frame[2].toString(16)}`);
  }
  const byteCount = quantity * 2;
  if (frame[2] !== byteCount || frame.length !== expectedReadLength(quantity)) {
    throw new Error('읽기 응답 길이가 예상과 다릅니다.');
  }

  const registers = [];
  for (let offset = 3; offset < 3 + byteCount; offset += 2) {
    registers.push(frame.readUInt16BE(offset));
  }
  return registers;
}

function parseWriteSingleResponse(frame, address, value) {
  if (!validateCrc(frame)) {
    throw new Error('CRC가 맞지 않는 응답입니다.');
  }
  if (frame[0] !== SLAVE_ID) {
    throw new Error('다른 장비 주소에서 온 응답입니다.');
  }
  if (frame[1] & 0x80) {
    throw new Error(`장비가 Modbus 오류를 반환했습니다. 코드: 0x${frame[2].toString(16)}`);
  }
  if (frame.length !== 8 || frame[1] !== 0x06) {
    throw new Error('쓰기 응답 길이가 예상과 다릅니다.');
  }
  const responseAddress = frame.readUInt16BE(2);
  const responseValue = frame.readUInt16BE(4);
  if (responseAddress !== address || responseValue !== value) {
    throw new Error('쓰기 응답 내용이 요청과 다릅니다.');
  }
  return true;
}

function parseWriteMultipleResponse(frame, address, quantity) {
  if (!validateCrc(frame)) {
    throw new Error('CRC가 맞지 않는 응답입니다.');
  }
  if (frame[0] !== SLAVE_ID) {
    throw new Error('다른 장비 주소에서 온 응답입니다.');
  }
  if (frame[1] & 0x80) {
    throw new Error(`장비가 Modbus 오류를 반환했습니다. 코드: 0x${frame[2].toString(16)}`);
  }
  if (frame.length !== 8 || frame[1] !== 0x10) {
    throw new Error('다중 쓰기 응답 길이가 예상과 다릅니다.');
  }
  const responseAddress = frame.readUInt16BE(2);
  const responseQuantity = frame.readUInt16BE(4);
  if (responseAddress !== address || responseQuantity !== quantity) {
    throw new Error('다중 쓰기 응답 내용이 요청과 다릅니다.');
  }
  return true;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class ModbusClient {
  constructor(transport, { retries = 2, retryDelayMs = 120 } = {}) {
    this.transport = transport;
    this.retries = retries;
    this.retryDelayMs = retryDelayMs;
  }

  async readHolding(address, quantity) {
    return this.#read(0x03, address, quantity);
  }

  async readInput(address, quantity) {
    return this.#read(0x04, address, quantity);
  }

  async writeSingle(address, value) {
    const frame = buildWriteSingleFrame(address, value);
    const response = await this.#request(frame, 8);
    return parseWriteSingleResponse(response, address, value);
  }

  async writeMultiple(address, values) {
    if (!Array.isArray(values) || values.length === 0) {
      throw new Error('다중 쓰기 값이 없습니다.');
    }
    if (values.length > 123) {
      throw new Error('다중 쓰기 값이 너무 많습니다.');
    }
    const frame = buildWriteMultipleFrame(address, values);
    const response = await this.#request(frame, 8);
    return parseWriteMultipleResponse(response, address, values.length);
  }

  async #read(functionCode, address, quantity) {
    const frame = buildReadFrame(functionCode, address, quantity);
    const response = await this.#request(frame, expectedReadLength(quantity));
    return parseReadResponse(response, quantity);
  }

  async #request(frame, expectedLength) {
    let lastError;
    for (let attempt = 0; attempt <= this.retries; attempt += 1) {
      try {
        return await this.transport.request(frame, expectedLength);
      } catch (error) {
        lastError = error;
        if (attempt < this.retries) await sleep(this.retryDelayMs);
      }
    }
    throw lastError;
  }
}

module.exports = {
  SLAVE_ID,
  ModbusClient,
  appendCrc,
  buildReadFrame,
  buildWriteMultipleFrame,
  buildWriteSingleFrame,
  crc16Modbus,
  parseReadResponse,
  parseWriteMultipleResponse,
  parseWriteSingleResponse,
  validateCrc
};
