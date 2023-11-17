const { app, BrowserWindow } = require('electron');
const electronReload = require('electron-reload');
let mainWindow;


electronReload(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 280,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    frame: false,
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

