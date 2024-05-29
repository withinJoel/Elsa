const { app, BrowserWindow, screen, Menu } = require('electron');
const path = require('path');

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
      safeDialogs: true, // Use safe dialogs for better security
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

app.whenReady().then(createWindow);