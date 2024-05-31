const { app, BrowserWindow, screen, Menu, ipcMain, dialog  } = require('electron');
const path = require('path');
const os = require('os');
const axios = require('axios');
const fs = require('fs');
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

///////////////////////////////Update
function getCurrentVersion() {
  const packageJsonPath = path.join(__dirname, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  return packageJson.version;
}

function incrementVersion(version, level) {
  const parts = version.split('.').map(Number);

  switch (level) {
    case 'patch':
      parts[2]++;
      break;
    case 'minor':
      parts[1]++;
      parts[2] = 0;
      break;
    case 'major':
      parts[0]++;
      parts[1] = 0;
      parts[2] = 0;
      break;
  }

  return parts.join('.');
}

function checkForUpdates() {
  const version = getCurrentVersion();
  const levels = ['patch', 'minor', 'major'];
  
  const checkNextVersion = (levelIndex) => {
    if (levelIndex >= levels.length) {
      console.log('No updates available.');
      return;
    }

    const nextVersion = incrementVersion(version, levels[levelIndex]);
    const url = `https://github.com/withinJoel/Elsa/releases/download/v${nextVersion}/Elsa.exe`;

    axios
      .head(url)
      .then(() => {
        dialog.showMessageBox({
          type: 'info',
          buttons: ['Yes', 'No'],
          title: 'Update Available',
          message: `A new update (v${nextVersion}) is available. Do you want to download it?`,
        }).then(result => {
          if (result.response === 0) { // 'Yes' button
            downloadUpdate(url);
          }
        });
      })
      .catch(() => {
        checkNextVersion(levelIndex + 1);
      });
  };

  checkNextVersion(0);
}

function downloadUpdate(url) {
  const filePath = path.join(app.getPath('downloads'), 'Elsa.exe');
  const writer = fs.createWriteStream(filePath);

  axios({
    method: 'get',
    url: url,
    responseType: 'stream',
  }).then(response => {
    response.data.pipe(writer);
    writer.on('finish', () => {
      dialog.showMessageBox({
        type: 'info',
        buttons: ['OK'],
        title: 'Download Complete',
        message: 'The update has been downloaded. The application will now restart to apply the update.',
      }).then(() => {
        exec(filePath, (error) => {
          if (error) {
            console.error(`Error executing file: ${error}`);
            return;
          }
          app.quit();
        });
      });
    });
    writer.on('error', err => {
      console.error(`Error downloading update: ${err}`);
    });
  }).catch(error => {
    console.error(`Error downloading update: ${error}`);
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

///////////////////////////////Open File Explorer
ipcMain.handle('open-file-explorer', () => {
  return new Promise((resolve, reject) => {
    let openCommand;
    const homeDir = require('os').homedir();

    switch (process.platform) {
      case 'win32':
        openCommand = `explorer.exe ${homeDir}`;
        break;
      case 'darwin':
        openCommand = `open ${homeDir}`;
        break;
      case 'linux':
      case 'openbsd':
      case 'freebsd':
        openCommand = `xdg-open ${homeDir}`;
        break;
      default:
        reject(new Error('Opening file explorer is not supported on this platform.'));
        return;
    }

    exec(openCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error executing open command: ${error.message}`));
        return;
      }
      resolve('File explorer opened.');
    });
  });
});
///////////////////////////////Open Calculator
ipcMain.handle('open-calculator', () => {
  return new Promise((resolve, reject) => {
    let command;

    switch (process.platform) {
      case 'win32':
        command = 'calc'; // Windows command to open the calculator
        break;
      case 'darwin':
        command = 'open -a Calculator'; // macOS command to open the calculator
        break;
      case 'linux':
        command = 'gnome-calculator'; // Linux command to open the calculator (GNOME desktop)
        break;
      default:
        reject(new Error('Opening the calculator is not supported on this platform.'));
        return;
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error executing command: ${error.message}`));
        return;
      }
      resolve('Calculator opened successfully.');
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
///////////////////////////////System Mute
ipcMain.handle('mute-audio', () => {
  return new Promise((resolve, reject) => {
    let muteAudioCommand;

    switch (process.platform) {
      case 'win32':
        muteAudioCommand = 'powershell -Command "(New-Object -ComObject WScript.Shell).SendKeys([char]173)"'; // This sends the mute key to the system.
        break;
      case 'darwin':
        muteAudioCommand = 'osascript -e "set volume output muted true"';
        break;
      case 'linux':
        muteAudioCommand = 'amixer set Master mute'; // This command assumes 'amixer' is installed.
        break;
      case 'openbsd':
      case 'freebsd':
        reject(new Error('Muting audio is not supported on this platform.'));
        return;
      default:
        reject(new Error('Muting audio is not supported on this platform.'));
        return;
    }

    exec(muteAudioCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error muting audio: ${error.message}`));
        return;
      }
      resolve('Audio muted successfully.');
    });
  });
});
//////////////////////////////Task Manager
ipcMain.handle('open-taskmanager', () => {
  return new Promise((resolve, reject) => {
    let openTaskManagerCommand;

    switch (process.platform) {
      case 'win32':
        openTaskManagerCommand = 'taskmgr';
        break;
      case 'darwin':
        openTaskManagerCommand = 'open /Applications/Utilities/Activity\ Monitor.app';
        break;
      case 'linux':
        openTaskManagerCommand = 'gnome-system-monitor';
        break;
      case 'openbsd':
      case 'freebsd':
        reject(new Error('Opening Task Manager is not supported on this platform.'));
        return;
      default:
        reject(new Error('Opening Task Manager is not supported on this platform.'));
        return;
    }

    exec(openTaskManagerCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error opening Task Manager: ${error.message}`));
        return;
      }
      resolve('Task Manager opened successfully.');
    });
  });
});
//////////////////////////////Open Browser
ipcMain.handle('open-browser', () => {
  return new Promise((resolve, reject) => {
    let openBrowserCommand;
    const url = 'https://duckduckgo.com'; // Change this URL to the desired website

    switch (process.platform) {
      case 'win32':
        openBrowserCommand = `start ${url}`;
        break;
      case 'darwin':
        openBrowserCommand = `open ${url}`;
        break;
      case 'linux':
        openBrowserCommand = `xdg-open ${url}`;
        break;
      case 'openbsd':
      case 'freebsd':
        reject(new Error('Opening browser is not supported on this platform.'));
        return;
      default:
        reject(new Error('Opening browser is not supported on this platform.'));
        return;
    }

    exec(openBrowserCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error opening browser: ${error.message}`));
        return;
      }
      resolve('Browser opened successfully.');
    });
  });
});
//////////////////////////////Open Notepad
ipcMain.handle('open-notepad', () => {
  return new Promise((resolve, reject) => {
    let openNotepadCommand;

    switch (process.platform) {
      case 'win32':
        openNotepadCommand = 'start notepad';
        break;
      case 'darwin':
        openNotepadCommand = 'open -a "TextEdit"';
        break;
      case 'linux':
        openNotepadCommand = 'xdg-open /path/to/notepad';
        break;
      case 'openbsd':
      case 'freebsd':
        reject(new Error('Opening Notepad is not supported on this platform.'));
        return;
      default:
        reject(new Error('Opening Notepad is not supported on this platform.'));
        return;
    }

    exec(openNotepadCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error opening Notepad: ${error.message}`));
        return;
      }
      resolve('Notepad opened successfully.');
    });
  });
});
///////////////////////////////Switch to light theme
ipcMain.handle('switch-to-light-theme', () => {
  return new Promise((resolve, reject) => {
    let switchThemeCommand;

    switch (process.platform) {
      case 'win32':
        switchThemeCommand = 'powershell -Command "Set-ItemProperty -Path HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize -Name AppsUseLightTheme -Value 1"';
        break;
      case 'darwin':
        switchThemeCommand = 'osascript -e \'tell application "System Events" to tell appearance preferences to set dark mode to false\'';
        break;
      case 'linux':
        // This example assumes GNOME. Commands will vary based on the desktop environment.
        switchThemeCommand = 'gsettings set org.gnome.desktop.interface gtk-theme "Adwaita"';
        break;
      case 'openbsd':
      case 'freebsd':
        reject(new Error('Switching to light theme is not supported on this platform.'));
        return;
      default:
        reject(new Error('Switching to light theme is not supported on this platform.'));
        return;
    }

    exec(switchThemeCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error switching to light theme: ${error.message}`));
        return;
      }
      resolve('Switched to light theme successfully.');
    });
  });
});
///////////////////////////////Switch to dark theme
ipcMain.handle('switch-to-dark-theme', () => {
  return new Promise((resolve, reject) => {
    let switchThemeCommand;

    switch (process.platform) {
      case 'win32':
        switchThemeCommand = 'powershell -Command "Set-ItemProperty -Path HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize -Name AppsUseLightTheme -Value 0"';
        break;
      case 'darwin':
        switchThemeCommand = 'osascript -e \'tell application "System Events" to tell appearance preferences to set dark mode to true\'';
        break;
      case 'linux':
        // This example assumes GNOME. Commands will vary based on the desktop environment.
        switchThemeCommand = 'gsettings set org.gnome.desktop.interface gtk-theme "Adwaita-dark"';
        break;
      case 'openbsd':
      case 'freebsd':
        reject(new Error('Switching to dark theme is not supported on this platform.'));
        return;
      default:
        reject(new Error('Switching to dark theme is not supported on this platform.'));
        return;
    }

    exec(switchThemeCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error switching to dark theme: ${error.message}`));
        return;
      }
      resolve('Switched to dark theme successfully.');
    });
  });
});
///////////////////////////////Report Bug
ipcMain.handle('report-bug', () => {
  return new Promise((resolve, reject) => {
    let openBugReportCommand;

    switch (process.platform) {
      case 'win32':
        openBugReportCommand = 'start https://github.com/withinJoel/Elsa/issues';
        break;
      case 'darwin':
        openBugReportCommand = 'open https://github.com/withinJoel/Elsa/issues';
        break;
      case 'linux':
        openBugReportCommand = 'xdg-open https://github.com/withinJoel/Elsa/issues';
        break;
      case 'openbsd':
      case 'freebsd':
        reject(new Error('Opening bug report site is not supported on this platform.'));
        return;
      default:
        reject(new Error('Opening bug report site is not supported on this platform.'));
        return;
    }

    exec(openBugReportCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error opening bug report site: ${error.message}`));
        return;
      }
      resolve('Bug report site opened successfully.');
    });
  });
});
///////////////////////////////System Screenshot
ipcMain.handle('take-screenshot', () => {
  return new Promise((resolve, reject) => {
    // Start a countdown from 1 seconds
    let count = 1;
    const countdownInterval = setInterval(() => {
      if (count > 0) {
        console.log(count);
        count--;
      } else {
        clearInterval(countdownInterval);

        // Take screenshot after countdown
        let screenshotCommand;

        switch (process.platform) {
          case 'win32':
            screenshotCommand = 'start /wait ms-screenclip:';
            break;
          case 'darwin':
            screenshotCommand = 'screencapture -T 5 -C screenshot.png'; // Delayed capture after 5 seconds
            break;
          case 'linux':
            screenshotCommand = 'gnome-screenshot -d 5'; // Delayed capture after 5 seconds
            break;
          case 'openbsd':
          case 'freebsd':
            reject(new Error('Taking screenshots is not supported on this platform.'));
            return;
          default:
            reject(new Error('Taking screenshots is not supported on this platform.'));
            return;
        }

        exec(screenshotCommand, (error, stdout, stderr) => {
          if (error) {
            reject(new Error(`Error taking screenshot: ${error.message}`));
            return;
          }
          resolve('Screenshot captured successfully.');
        });
      }
    }, 1000); // Countdown interval in milliseconds
  });
});
///////////////////////////////System Unmute
ipcMain.handle('unmute-audio', () => {
  return new Promise((resolve, reject) => {
    let unmuteAudioCommand;

    switch (process.platform) {
      case 'win32':
        unmuteAudioCommand = 'powershell -Command "(New-Object -ComObject WScript.Shell).SendKeys([char]173)"'; // This sends the mute key to the system.
        break;
      case 'darwin':
        unmuteAudioCommand = 'osascript -e "set volume output muted false"';
        break;
      case 'linux':
        unmuteAudioCommand = 'amixer set Master unmute'; // This command assumes 'amixer' is installed.
        break;
      case 'openbsd':
      case 'freebsd':
        reject(new Error('Unmuting audio is not supported on this platform.'));
        return;
      default:
        reject(new Error('Unmuting audio is not supported on this platform.'));
        return;
    }

    exec(unmuteAudioCommand, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error unmuting audio: ${error.message}`));
        return;
      }
      resolve('Audio unmuted successfully.');
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

app.on('ready', () => {
  createWindow();
  checkForUpdates();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});