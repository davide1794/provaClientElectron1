const electron = require('electron')
const ipcMain = electron.ipcMain;
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, studentForm;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1000, height: 800})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function createFormStudent () {
  studentForm = new BrowserWindow({
    width: 800,
    height: 600,
    parent: mainWindow})
  studentForm.on('closed', function () {
    studentForm = null
  })


  // Or load a local HTML file
  studentForm.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/student.html'),
    protocol: 'file:',
    slashes: true
  }))

  studentForm.show()
}

ipcMain.on('windows-student-form-active', function (event, studentsSocketService) {
  global.sharedObj = {
    'studentsSocketService': studentsSocketService
  };
  createFormStudent();
})

ipcMain.on('windows-student-form-close', function () {
  if (studentForm)
    studentForm.close();
  studentForm = null;
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
