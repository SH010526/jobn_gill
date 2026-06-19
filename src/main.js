const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { CoffeeController } = require('./lib/coffee-controller');
const { ModbusClient } = require('./lib/modbus');
const { SerialTransport } = require('./lib/serial-transport');

let mainWindow;
let transport;
let controller;
let reconnectTimer;
let wantedConnection = null;
let quitting = false;
let recovering = false;
const ALLOWED_PORTS = new Set(['COM6', 'COM7']);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 720,
    height: 820,
    minWidth: 720,
    minHeight: 760,
    backgroundColor: '#FAF6F0',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.setMenu(null);
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

function send(channel, payload) {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  mainWindow.webContents.send(channel, payload);
}

function wireController(nextController) {
  nextController.on('state', (state) => {
    send('machine:state', state);
    if (state?.consecutivePollErrors >= 5) {
      recoverConnection().catch((error) => {
        send('machine:log', {
          time: new Date().toISOString(),
          message: `자동 복구 실패: ${error.message}`
        });
      });
    }
  });
  nextController.on('log', (entry) => send('machine:log', entry));
}

async function openConnection({ port, baudRate }) {
  await closeConnection(false);

  wantedConnection = { port, baudRate: Number(baudRate) || 115200 };
  transport = new SerialTransport({
    path: wantedConnection.port,
    baudRate: wantedConnection.baudRate,
    timeoutMs: 700
  });
  await transport.open();

  controller = new CoffeeController(new ModbusClient(transport));
  wireController(controller);
  await controller.startPolling(100);
  send('machine:log', {
    time: new Date().toISOString(),
    message: `${wantedConnection.port}에 연결했습니다.`
  });
  startReconnectLoop();
  return controller.getSnapshot();
}

async function closeConnection(clearWanted = true) {
  if (clearWanted) wantedConnection = null;
  if (reconnectTimer && clearWanted) {
    clearInterval(reconnectTimer);
    reconnectTimer = null;
  }
  if (controller) {
    controller.stopPolling();
    controller.removeAllListeners();
    controller = null;
  }
  if (transport) {
    await transport.close();
    transport = null;
  }
}

function startReconnectLoop() {
  if (reconnectTimer) clearInterval(reconnectTimer);
  reconnectTimer = setInterval(async () => {
    if (!wantedConnection || !transport || transport.port?.isOpen) return;
    try {
      await openConnection(wantedConnection);
      send('machine:log', {
        time: new Date().toISOString(),
        message: '자동 재연결에 성공했습니다.'
      });
    } catch (error) {
      send('machine:log', {
        time: new Date().toISOString(),
        message: `자동 재연결 실패: ${error.message}`
      });
    }
  }, 2000);
}

async function recoverConnection() {
  if (recovering || !wantedConnection) return;
  recovering = true;
  try {
    send('machine:log', {
      time: new Date().toISOString(),
      message: '응답 없음이 반복되어 연결을 다시 엽니다.'
    });
    await openConnection(wantedConnection);
  } finally {
    recovering = false;
  }
}

ipcMain.handle('ports:list', async () => {
  const ports = await SerialTransport.listPorts();
  return [...ALLOWED_PORTS].map((path) => {
    const detected = ports.find((port) => String(port.path).toUpperCase() === path);
    return {
      path,
      manufacturer: detected?.manufacturer ?? '',
      friendlyName: detected?.friendlyName ?? `${path} - 과제용 포트`
    };
  });
});

ipcMain.handle('machine:connect', async (_event, config) => {
  if (!config?.port) throw new Error('연결할 COM 포트를 입력하세요.');
  if (!ALLOWED_PORTS.has(String(config.port).toUpperCase())) {
    throw new Error('이 과제에서는 COM6 또는 COM7만 사용합니다.');
  }
  return openConnection(config);
});

ipcMain.handle('machine:disconnect', async () => {
  await closeConnection(true);
  send('machine:state', null);
  return true;
});

ipcMain.handle('orders:add', async (_event, order) => {
  if (!controller) throw new Error('먼저 장비에 연결하세요.');
  return controller.enqueue(order);
});

ipcMain.handle('orders:cancel-active', async () => {
  if (!controller) throw new Error('먼저 장비에 연결하세요.');
  return controller.cancelActive();
});

ipcMain.handle('orders:clear-waiting', async () => {
  if (!controller) return 0;
  return controller.clearQueue();
});

ipcMain.handle('machine:snapshot', async () => controller?.getSnapshot() ?? null);

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', async (event) => {
  if (quitting) return;
  quitting = true;
  event.preventDefault();
  await closeConnection(true);
  app.exit(0);
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
