const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getCPUInfo: () => ipcRenderer.invoke('get-cpu-info'),
  shutdown: () => ipcRenderer.invoke('shutdown-system'),
  restart: () => ipcRenderer.invoke('restart-system'),
  signout: () => ipcRenderer.invoke('sign-out-system'),
  sleep: () => ipcRenderer.invoke('sleep-system'),
});