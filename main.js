const { app, BrowserWindow, screen, Menu, ipcMain, powerMonitor } = require('electron');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const emptyMenu = Menu.buildFromTemplate([]);

  const win = new BrowserWindow({
    title: "Elsa",
    backgroundColor: "#090909",
    width: 1250,
    minWidth: 1250,
    height: 600,
    frame: true,
    closable: true,
    center: true,
    hasShadow: true,
    fullscreen: false,
    fullscreenable: true,
    opacity: 1.0,
    autoHideMenuBar: true,
    resizable: true,
    maximizable: true,
    icon: path.join(app.getAppPath(), 'Logo/Elsa.ico'),
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      webSecurity: true,
      allowRunningInsecureContent: false,
      worldSafeExecuteJavaScript: true,
      additionalArguments: ['--allow-file-access-from-files'],
      safeDialogs: true,
      preload: path.join(__dirname, 'preload.js'), // Add this line to load the preload script
    },
  });

  // Load the local HTML file
  win.loadFile('index.html');

  // Set window margins and padding to 0
  win.webContents.on('dom-ready', () => {
    win.webContents.insertCSS(`
      html, body {
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
        overflow: auto;
      }
      #app {
        width: 100%;
        height: 100%;
      }
      /* Custom scrollbar styles to ensure they are visible */
      ::-webkit-scrollbar {
        width: 3px;
        height: 12px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
        -webkit-app-region: no-drag; /* Make scrollbar track non-draggable */
      }
      ::-webkit-scrollbar-thumb {
        background: white;
        border-radius:30px;
        -webkit-app-region: no-drag; /* Make scrollbar thumb non-draggable */
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    `);
  });
}

///////////////////////////////Shutdown
ipcMain.handle('shutdown-system', () => {
  return new Promise((resolve, reject) => {
    let shutdownCommand;
    switch (process.platform) {
      case 'win32':
        shutdownCommand = 'shutdown /s /t 0';
        break;
      case 'darwin':
      case 'linux':
      case 'openbsd':
      case 'freebsd':
        shutdownCommand = 'sudo shutdown -h now';
        break;
      default:
        reject(new Error('System shutdown is not supported on this platform.'));
        return;
    }

    exec(shutdownCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error executing shutdown command: ${error.message}`));
        return;
      }
      resolve('System is shutting down...');
    });
  });
});

///////////////////////////////Restart
ipcMain.handle('restart-system', () => {
  return new Promise((resolve, reject) => {
    let restartCommand;
    switch (process.platform) {
      case 'win32':
        restartCommand = 'shutdown /r /t 0';
        break;
      case 'darwin':
      case 'linux':
      case 'openbsd':
      case 'freebsd':
        restartCommand = 'sudo shutdown -r now';
        break;
      default:
        reject(new Error('System restart is not supported on this platform.'));
        return;
    }

    exec(restartCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error executing restart command: ${error.message}`));
        return;
      }
      resolve('System is restarting...');
    });
  });
});

// Sign out
ipcMain.handle('sign-out-system', () => {
  return new Promise((resolve, reject) => {
    let signOutCommand;
    switch (process.platform) {
      case 'win32':
        signOutCommand = 'shutdown /l';
        break;
      case 'darwin':
      case 'linux':
      case 'openbsd':
      case 'freebsd':
        signOutCommand = 'sudo pkill -KILL -u $USER';
        break;
      default:
        reject(new Error('Sign out is not supported on this platform.'));
        return;
    }

    exec(signOutCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error executing sign out command: ${error.message}`));
        return;
      }
      resolve('User is signing out...');
    });
  });
});

// Sleep
ipcMain.handle('sleep-system', () => {
  return new Promise((resolve, reject) => {
    let sleepCommand;
    switch (process.platform) {
      case 'win32':
        sleepCommand = 'rundll32.exe powrprof.dll,SetSuspendState 0,1,0';
        break;
      case 'darwin':
      case 'linux':
      case 'openbsd':
      case 'freebsd':
        sleepCommand = 'sudo pm-suspend';
        break;
      default:
        reject(new Error('System sleep is not supported on this platform.'));
        return;
    }

    exec(sleepCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error executing sleep command: ${error.message}`));
        return;
      }
      resolve('System is going to sleep...');
    });
  });
});

///////////////////////////////CPU Info
ipcMain.handle('get-cpu-info', () => {
  return os.cpus();
});

app.whenReady().then(createWindow);