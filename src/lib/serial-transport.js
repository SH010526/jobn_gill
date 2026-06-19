const { EventEmitter } = require('node:events');
const { SerialPort } = require('serialport');

class SerialTransport extends EventEmitter {
  constructor({ path, baudRate = 115200, timeoutMs = 700 }) {
    super();
    this.path = path;
    this.baudRate = baudRate;
    this.timeoutMs = timeoutMs;
    this.port = null;
    this.rxBuffer = Buffer.alloc(0);
    this.queue = Promise.resolve();
    this.pending = null;
  }

  static async listPorts() {
    return SerialPort.list();
  }

  async open() {
    if (this.port?.isOpen) return;

    this.port = new SerialPort({
      path: this.path,
      baudRate: this.baudRate,
      dataBits: 8,
      parity: 'none',
      stopBits: 1,
      autoOpen: false
    });

    this.port.on('data', (chunk) => this.#onData(chunk));
    this.port.on('error', (error) => this.emit('error', error));
    this.port.on('close', () => this.emit('close'));

    await new Promise((resolve, reject) => {
      this.port.open((error) => (error ? reject(error) : resolve()));
    });
  }

  async close() {
    if (!this.port) return;
    const port = this.port;
    this.port = null;
    this.rxBuffer = Buffer.alloc(0);

    if (port.isOpen) {
      await new Promise((resolve) => port.close(() => resolve()));
    }
  }

  async request(frame, expectedLength) {
    this.queue = this.queue.catch(() => undefined).then(() => this.#requestNow(frame, expectedLength));
    return this.queue;
  }

  async #requestNow(frame, expectedLength) {
    if (!this.port?.isOpen) {
      throw new Error('시리얼 포트가 연결되어 있지 않습니다.');
    }

    this.rxBuffer = Buffer.alloc(0);

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending = null;
        reject(new Error('장비 응답 시간이 초과되었습니다.'));
      }, this.timeoutMs);

      this.pending = {
        expectedLength,
        resolve: (value) => {
          clearTimeout(timer);
          this.pending = null;
          resolve(value);
        },
        reject: (error) => {
          clearTimeout(timer);
          this.pending = null;
          reject(error);
        }
      };

      this.port.write(frame, (writeError) => {
        if (writeError) {
          this.pending?.reject(writeError);
          return;
        }
        this.port.drain((drainError) => {
          if (drainError) this.pending?.reject(drainError);
        });
      });
    });
  }

  #onData(chunk) {
    this.rxBuffer = Buffer.concat([this.rxBuffer, chunk]);
    if (!this.pending) return;

    if (this.rxBuffer.length >= this.pending.expectedLength) {
      const frame = this.rxBuffer.subarray(0, this.pending.expectedLength);
      this.rxBuffer = this.rxBuffer.subarray(this.pending.expectedLength);
      this.pending.resolve(frame);
    }
  }
}

module.exports = { SerialTransport };
