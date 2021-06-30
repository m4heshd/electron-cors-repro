const {app, BrowserWindow} = require('electron');
const fs = require('fs');
const http = require('http');
const path = require('path');

app.commandLine.appendSwitch('disable-site-isolation-trials');

const isHttp = process.argv[2] === 'http';

if (isHttp) {
    http.createServer((req, res) => {
        fs.readFile(path.join(__dirname, 'windows', req.url), (err,data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200);
            res.end(data);
        });
    }).listen(8080);
}

function createWindow () {
    const mainWindow = new BrowserWindow({
        backgroundColor: '#282c34',
        width: 1280,
        height: 800,
        show: false,
        webPreferences: {
            nativeWindowOpen: true,
            contextIsolation: false,
            nodeIntegration: true,
            additionalArguments: [JSON.stringify({isHttp})],
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'windows', 'main.html')).then(() => {
        mainWindow.show();
    });

    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
