import {app, BrowserWindow } from 'electron';

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile('./view/index.html').catch((err: any) => {
        console.error(err);
    })
}

app.whenReady().then(() => {
    createWindow();
})