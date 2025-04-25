
import electron from 'electron';
const { app, BrowserWindow } = electron;
import path from 'path';


let x = "HEYOY!!!"
let mainWindow = null;
app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});
function createWindow() {

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    title: x
  });
  mainWindow.loadURL(`file://${path.join(__dirname, '/index.html')}`);
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  mainWindow.on('page-title-updated', function (e) {
    e.preventDefault()
  });
}
