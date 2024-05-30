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

///////////////////////////////Installed APPS
ipcMain.handle('get-installed-programs', () => {
  return new Promise((resolve, reject) => {
    let listProgramsCommand;
    switch (process.platform) {
      case 'win32':
        listProgramsCommand = 'powershell -Command "Get-ItemProperty HKLM:\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Select-Object DisplayName, DisplayVersion"';
        break;
      case 'darwin':
        listProgramsCommand = 'system_profiler SPApplicationsDataType';
        break;
      case 'linux':
        // This is a generic command and might vary depending on the Linux distribution.
        listProgramsCommand = 'dpkg-query -W -f=\'${binary:Package} ${Version}\n\''; // For Debian-based systems.
        break;
      case 'openbsd':
      case 'freebsd':
        reject(new Error('Listing installed programs is not supported on this platform.'));
        return;
      default:
        reject(new Error('Listing installed programs is not supported on this platform.'));
        return;
    }

    exec(listProgramsCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error executing command: ${error.message}`));
        return;
      }
      resolve(stdout);
    });
  });
});
///////////////////////////////Screen keyboard
ipcMain.handle('open-screen-keyboard', () => {
  return new Promise((resolve, reject) => {
    let openKeyboardCommand;

    switch (process.platform) {
      case 'win32':
        openKeyboardCommand = 'powershell -Command "Start-Process -FilePath \'osk.exe\' -Verb RunAs"';
        break;
      case 'darwin':
        openKeyboardCommand = 'open -a KeyboardViewer';
        break;
      case 'linux':
        openKeyboardCommand = 'onboard'; // Assuming 'onboard' is installed.
        break;
      case 'openbsd':
      case 'freebsd':
        reject(new Error('Bringing up the on-screen keyboard is not supported on this platform.'));
        return;
      default:
        reject(new Error('Bringing up the on-screen keyboard is not supported on this platform.'));
        return;
    }

    exec(openKeyboardCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error opening on-screen keyboard: ${error.message}`));
        return;
      }
      resolve(`On-screen keyboard opened successfully. Output: ${stdout}`);
    });
  });
});
///////////////////////////////Check System Update
ipcMain.handle('check-system-update', () => {
  return new Promise((resolve, reject) => {
    let checkUpdateCommand;
    switch (process.platform) {
      case 'win32':
        checkUpdateCommand = 'powershell -Command "Start-Process -FilePath \'control.exe\' -ArgumentList \'/name Microsoft.WindowsUpdate\' -Verb RunAs"';
        break;
      case 'darwin':
        checkUpdateCommand = 'softwareupdate -l';
        break;
      case 'linux':
        // This is a generic command and might vary depending on the Linux distribution.
        checkUpdateCommand = 'sudo apt update && sudo apt list --upgradable'; // For Debian-based systems.
        break;
      case 'openbsd':
      case 'freebsd':
        reject(new Error('Checking for updates is not supported on this platform.'));
        return;
      default:
        reject(new Error('Checking for updates is not supported on this platform.'));
        return;
    }

    exec(checkUpdateCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error executing command: ${error.message}`));
        return;
      }
      resolve(`System update check completed. Output: ${stdout}`);
    });
  });
});

///////////////////////////////Open Settings
ipcMain.handle('open-settings', () => {
  return new Promise((resolve, reject) => {
    let openSettingsCommand;
    switch (process.platform) {
      case 'win32':
        openSettingsCommand = 'start ms-settings:';
        break;
      case 'darwin':
        openSettingsCommand = 'open /System/Library/PreferencePanes';
        break;
      case 'linux':
        // This is a generic command and might vary depending on the Linux distribution and desktop environment.
        openSettingsCommand = 'gnome-control-center'; // Change this to the appropriate command for your Linux environment.
        break;
      case 'openbsd':
      case 'freebsd':
        reject(new Error('Opening settings is not supported on this platform.'));
        return;
      default:
        reject(new Error('Opening settings is not supported on this platform.'));
        return;
    }

    exec(openSettingsCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error executing command: ${error.message}`));
        return;
      }
      resolve('Settings opened.');
    });
  });
});

///////////////////////////////Open Terminal
ipcMain.handle('open-cmd', () => {
  return new Promise((resolve, reject) => {
    let openCmdCommand;
    switch (process.platform) {
      case 'win32':
        openCmdCommand = 'start cmd';
        break;
      case 'darwin':
        openCmdCommand = 'open -a Terminal';
        break;
      case 'linux':
        // This is a generic command and might vary depending on the Linux distribution and desktop environment.
        openCmdCommand = 'x-terminal-emulator';
        break;
      case 'openbsd':
      case 'freebsd':
        reject(new Error('Opening CMD is not supported on this platform.'));
        return;
      default:
        reject(new Error('Opening CMD is not supported on this platform.'));
        return;
    }

    exec(openCmdCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error executing command: ${error.message}`));
        return;
      }
      resolve('Command prompt opened.');
    });
  });
});

///////////////////////////////Open ENV Variables
ipcMain.handle('open-env-variables', () => {
  return new Promise((resolve, reject) => {
    let openEnvCommand;
    switch (process.platform) {
      case 'win32':
        openEnvCommand = 'rundll32.exe sysdm.cpl,EditEnvironmentVariables';
        break;
      case 'darwin':
        openEnvCommand = 'open /System/Library/PreferencePanes/JavaPreferences.prefPane';
        break;
      case 'linux':
        // This is a generic command and might vary depending on the Linux distribution and desktop environment.
        openEnvCommand = 'env'; // Change this to the appropriate command for your Linux environment.
        break;
      case 'openbsd':
      case 'freebsd':
        reject(new Error('Opening environment variables is not supported on this platform.'));
        return;
      default:
        reject(new Error('Opening environment variables is not supported on this platform.'));
        return;
    }

    exec(openEnvCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error executing command: ${error.message}`));
        return;
      }
      resolve('Environment variables settings opened.');
    });
  });
});

///////////////////////////////CPU Info
ipcMain.handle('get-cpu-info', () => {
  return os.cpus();
});

app.whenReady().then(createWindow);