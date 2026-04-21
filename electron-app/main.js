const { app, BrowserWindow, session } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 520,
    height: 920,
    resizable: false,
    title: 'iPhone 15 Pro Emulator',
    backgroundColor: '#0d0d1a',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Grant all permissions so the webview can load Facebook without being blocked
  win.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
    callback(true);
  });

  // Allow Facebook's partition session the same permissions
  session.fromPartition('persist:facebook').setPermissionRequestHandler((webContents, permission, callback) => {
    callback(true);
  });

  win.loadFile('index.html');
  win.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
