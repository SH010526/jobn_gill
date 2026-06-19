const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('machineApi', {
  listPorts: () => ipcRenderer.invoke('ports:list'),
  connect: (config) => ipcRenderer.invoke('machine:connect', config),
  disconnect: () => ipcRenderer.invoke('machine:disconnect'),
  snapshot: () => ipcRenderer.invoke('machine:snapshot'),
  addOrder: (order) => ipcRenderer.invoke('orders:add', order),
  cancelActive: () => ipcRenderer.invoke('orders:cancel-active'),
  clearWaiting: () => ipcRenderer.invoke('orders:clear-waiting'),
  onState: (callback) => {
    const listener = (_event, state) => callback(state);
    ipcRenderer.on('machine:state', listener);
    return () => ipcRenderer.removeListener('machine:state', listener);
  },
  onLog: (callback) => {
    const listener = (_event, entry) => callback(entry);
    ipcRenderer.on('machine:log', listener);
    return () => ipcRenderer.removeListener('machine:log', listener);
  }
});
