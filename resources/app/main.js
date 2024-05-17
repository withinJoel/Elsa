const { app, BrowserWindow, screen, Menu } = require('electron');
const path = require('path');
const os = require('os');

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const emptyMenu = Menu.buildFromTemplate([]);

  const win = new BrowserWindow({
    width: 1250,
    height: 600,
    frame: true,
    autoHideMenuBar: true,
    resizable: true,
    maximizable: true,
    icon: path.join(app.getAppPath(), 'Core/Logo/Elsa.ico'), // Use app.getAppPath() to get the resources directory
    webPreferences: {
      nodeIntegration: false, // Set to false for security
    }
  });

  // Load the local HTML file
  win.loadURL(`file://${path.join(__dirname, 'Core/index.html')}`);

  // Set window margins and padding to 0
  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS(`
      html, body, #app {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
      }
    `);
  });

  // Listen for maximize event to adjust the window size
  win.on('maximize', () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    win.setSize(width, height);
  });
}

app.whenReady().then(createWindow);