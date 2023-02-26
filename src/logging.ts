import { NextFunction, Request, Response } from 'express';

const getTimeStamp = (): string => {
    return new Date().toISOString();
};

const info = (namespace: string, message: string, object?: any): void => {
    if (object) {
        console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message},`, object);
    } else {
        console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message},`);
    }
};

const warn = (namespace: string, message: string, object?: any): void => {
    if (object) {
        console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message},`, object);
    } else {
        console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message},`);
    }
};

const error = (namespace: string, message: string, object?: any): void => {
    if (object) {
        console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message},`, object);
    } else {
        console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message},`);
    }
};

const debug = (namespace: string, message: string, object?: any): void => {
    if (object) {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message},`, object);
    } else {
        console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message},`);
    }
};

const logRequest = (req: Request, res: Response, next: NextFunction) => {
    info('Index middleware', `METHOD - [${req.method}, URL - [${req.url}], IP - [${req.socket.remoteAddress}]]`);

    res.on('finish', () => {
        info(
            'Index middleware',
            `METHOD - [${req.method}, URL - [${req.url}], IP - [${req.socket.remoteAddress}] 
        STATUS - [${res.statusCode}]]`
        );
    });

    next();
};

export default {
    info,
    warn,
    error,
    debug,
    logRequest
};
