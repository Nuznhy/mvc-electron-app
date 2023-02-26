import {app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { addUser, showUsers } from './controller/users';

let window: BrowserWindow;

const createWindow = () => {
    console.log(path.join(__dirname, 'preload.js'))
    window = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    window.loadFile('./view/index.html').then(() => {
        window.show();
    }).catch((err: any) => {
        console.error(err);
    })
    window.webContents.openDevTools();
    return window;
}

app.whenReady().then(() => {
    window = createWindow();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

ipcMain.handle('message', (event, obj) => {
    return showUsers();
})

ipcMain.handle('addUser', (event, obj) => {
    const newUser = addUser(obj);
    console.log(showUsers())
    return newUser
})
