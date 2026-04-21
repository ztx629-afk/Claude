const { app, BrowserWindow, session } = require('electron');
const path = require('path');

const IPHONE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

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
      webSecurity: false,
      allowRunningInsecureContent: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Spoof user agent on all requests from the default session
  // so Facebook sees an iPhone, not Electron
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = IPHONE_UA;
    // Remove headers that expose Electron
    delete details.requestHeaders['X-Requested-With'];
    callback({ requestHeaders: details.requestHeaders });
  });

  // Grant all permissions (camera, notifications, etc.)
  session.defaultSession.setPermissionRequestHandler((wc, permission, callback) => {
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
