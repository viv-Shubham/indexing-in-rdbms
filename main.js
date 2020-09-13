const {app, BrowserWindow} = require('electron')
const path = require('path')
// require("materialize")

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 700,
    height: 600,
    resizable:false,
    webPreferences: {
      nodeIntegration:true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
  // mainWindow.removeMenu();
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})