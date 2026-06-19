const assert = require('node:assert/strict');
const test = require('node:test');
const {
  ModbusClient,
  appendCrc,
  buildReadFrame,
  buildWriteMultipleFrame,
  buildWriteSingleFrame,
  crc16Modbus,
  parseWriteMultipleResponse,
  parseReadResponse,
  validateCrc
} = require('../src/lib/modbus');

test('Modbus CRC16 matches a known request frame', () => {
  const request = Buffer.from([0x01, 0x03, 0x00, 0x00, 0x00, 0x0a]);
  assert.equal(crc16Modbus(request), 0xcdc5);
  assert.deepEqual(appendCrc(request), Buffer.from([0x01, 0x03, 0x00, 0x00, 0x00, 0x0a, 0xc5, 0xcd]));
});

test('read and write frames are built with little-endian CRC bytes', () => {
  assert.equal(buildReadFrame(0x04, 0x0002, 0x0001).length, 8);
  assert.equal(buildWriteSingleFrame(0x0000, 0x0005).toString('hex').startsWith('010600000005'), true);
  assert.equal(buildWriteMultipleFrame(0x0120, [150, 300]).toString('hex').startsWith('011001200002040096012c'), true);
  assert.equal(validateCrc(buildWriteSingleFrame(0x0000, 0x0005)), true);
  assert.equal(validateCrc(buildWriteMultipleFrame(0x0120, [150, 300])), true);
});

test('read response parser returns register values and rejects bad CRC', () => {
  const good = appendCrc([0x01, 0x04, 0x04, 0x00, 0x64, 0x01, 0x2c]);
  assert.deepEqual(parseReadResponse(good, 2), [100, 300]);

  const bad = Buffer.from(good);
  bad[bad.length - 1] ^= 0xff;
  assert.throws(() => parseReadResponse(bad, 2), /CRC/);
});

test('write multiple response parser validates address and quantity', () => {
  const good = appendCrc([0x01, 0x10, 0x01, 0x20, 0x00, 0x02]);
  assert.equal(parseWriteMultipleResponse(good, 0x0120, 2), true);

  const bad = appendCrc([0x01, 0x10, 0x01, 0x21, 0x00, 0x02]);
  assert.throws(() => parseWriteMultipleResponse(bad, 0x0120, 2), /요청과 다릅니다/);
});

test('ModbusClient sends expected requests through a transport', async () => {
  const sent = [];
  const transport = {
    async request(frame, expectedLength) {
      sent.push({ frame, expectedLength });
      if (frame[1] === 0x04) return appendCrc([0x01, 0x04, 0x02, 0x00, 0x03]);
      if (frame[1] === 0x10) return appendCrc([0x01, 0x10, frame[2], frame[3], frame[4], frame[5]]);
      return appendCrc([0x01, 0x06, frame[2], frame[3], frame[4], frame[5]]);
    }
  };
  const client = new ModbusClient(transport);

  assert.deepEqual(await client.readInput(0x0003, 1), [3]);
  assert.equal(await client.writeSingle(0x0000, 0x0005), true);
  assert.equal(await client.writeMultiple(0x0120, [150, 300]), true);
  assert.equal(sent[0].expectedLength, 7);
  assert.equal(sent[1].expectedLength, 8);
  assert.equal(sent[2].expectedLength, 8);
});

test('ModbusClient retries transient request failures', async () => {
  let calls = 0;
  const transport = {
    async request() {
      calls += 1;
      if (calls === 1) throw new Error('timeout');
      return appendCrc([0x01, 0x04, 0x02, 0x00, 0x03]);
    }
  };
  const client = new ModbusClient(transport, { retries: 1, retryDelayMs: 1 });

  assert.deepEqual(await client.readInput(0x0003, 1), [3]);
  assert.equal(calls, 2);
});
