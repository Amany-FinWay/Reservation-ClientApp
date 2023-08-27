const { app, BrowserWindow } = require('electron');

const url = require("url");
const path = require("path");
require('module').globalPaths.push("C:\Users\Amany\source\repos\Reservation-ClientApp\node_modules");
let mainWindow
function createWindow() {
mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    autoHideMenuBar: true,
    fullscreen: true,
    webPreferences: {
        nodeIntegration: false,
        webviewTag: true,
        worldSafeExecuteJavaScript: true,
        devTools: true,
        enableRemoteModule: true,

    }
})
mainWindow.loadURL(
    url.format({
        pathname: path.join(__dirname, `/dist/reservation-client-app/index.html`),
        protocol: "file:",
        slashes: true
    })
);
mainWindow.webContents.openDevTools()

mainWindow.on('closed', function () {
    mainWindow = null
})
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})
