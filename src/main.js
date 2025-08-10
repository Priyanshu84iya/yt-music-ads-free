const { app, BrowserWindow, session, globalShortcut, ipcMain, nativeTheme } = require('electron');
const path = require('path');
const fs = require('fs');
// Ensure autoplay works even without gesture
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
const Store = require('electron-store');
const { initAdblock } = require('./adblock');

// Node 18+ has global fetch. For older versions you can uncomment next line
global.fetch = global.fetch || ((...args) => import('node-fetch').then(({default: f}) => f(...args)));

const store = new Store({ name: 'settings' });

let mainWindow;

async function setupAdblock(sess) {
  // Load filter lists (AdGuard + uAssets). @cliqz/adblocker understands these formats.
  const lists = [
    'https://easylist.to/easylist/easylist.txt',
    'https://easylist.to/easylist/easyprivacy.txt',
    'https://raw.githubusercontent.com/uBlockOrigin/uAssets/refs/heads/master/filters/annoyances.txt',
    'https://raw.githubusercontent.com/uBlockOrigin/uAssets/refs/heads/master/filters/filters.txt',
  ];

  await initAdblock(sess, lists);

  // Strip tracking headers
  sess.webRequest.onBeforeSendHeaders((details, callback) => {
    const headers = details.requestHeaders || {};
    delete headers['x-client-data'];
    delete headers['X-Client-Data'];
    callback({ requestHeaders: headers });
  });

  // Remove CSP that may block our CSS and scripts
  sess.webRequest.onHeadersReceived((details, callback) => {
    const responseHeaders = details.responseHeaders || {};
    delete responseHeaders['content-security-policy'];
    delete responseHeaders['Content-Security-Policy'];
    callback({ responseHeaders });
  });
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#121212' : '#ffffff',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false,
      partition: 'persist:ytm',
      autoplayPolicy: 'no-user-gesture-required',
      backgroundThrottling: false
    }
  });

  // Allow Google account popups inside the app; open other links externally
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\/(accounts|myaccount)\.google\.com\//.test(url)) {
      return { action: 'allow' };
    }
    const { shell } = require('electron');
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Keep playing audio in background
  mainWindow.on('minimize', () => {
    // Nothing needed; Chromium continues media by default, but preload also patches vis API
  });
  mainWindow.on('blur', () => {
    // ensure no pause
  });

  // Spoof a desktop UA to avoid mobile layout quirks
  const ua = mainWindow.webContents.getUserAgent();
  if (!/Windows NT/.test(ua)) {
    mainWindow.webContents.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36');
  }

  mainWindow.loadURL('https://music.youtube.com/');

  // Optional: fake media engagement to avoid autoplay blocks
  mainWindow.webContents.setAudioMuted(false);

  // Media keys
  globalShortcut.register('MediaPlayPause', () => mainWindow.webContents.send('media:playpause'));
  globalShortcut.register('MediaNextTrack', () => mainWindow.webContents.send('media:next'));
  globalShortcut.register('MediaPreviousTrack', () => mainWindow.webContents.send('media:previous'));

  // IPC from preload for controls
  ipcMain.on('media:play', () => mainWindow.webContents.send('media:play'));
  ipcMain.on('media:pause', () => mainWindow.webContents.send('media:pause'));
  ipcMain.on('media:playpause', () => mainWindow.webContents.send('media:playpause'));
  ipcMain.on('media:next', () => mainWindow.webContents.send('media:next'));
  ipcMain.on('media:previous', () => mainWindow.webContents.send('media:previous'));

  return mainWindow;
}

app.whenReady().then(async () => {
  const sess = session.fromPartition('persist:ytm');
  await setupAdblock(sess);
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  // Keep app alive for background playback unless user quits explicitly
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
