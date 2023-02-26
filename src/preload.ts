import {contextBridge} from 'electron';
import {ipcRenderer} from 'electron';

const ipc = {
    'render': {
        'send': [],
        'receive': [],
        'sendReceive': [
            'message',
            'addUser'
        ]
    }
};

contextBridge.exposeInMainWorld(
    'ipcRender', {

        send: (channel: never, args: any) => {
            let validChannels = ipc.render.send;
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, args);
            }
        },

        receive: (channel: never, listener: any) => {
            let validChannels = ipc.render.receive;
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => listener(...args));
            }
        },

        invoke: (channel: never, args: any) => {
            let validChannels = ipc.render.sendReceive;
            if (validChannels.includes(channel)) {
                return ipcRenderer.invoke(channel, args);
            }
        }
    }
);