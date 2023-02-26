import { users } from '../model/users';
import {Request, Response} from 'express';

const makeid = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

interface successResponse {
    result: any;
    success: boolean;
}

export const successResponse = (res: Response, data?: any, status: number = 200): Response => {
    const body: successResponse = {
        result: data,
        success: true
    };
    return res.status(status).json(body);
};

const showUsers = (req: Request, res: Response) => {
    return successResponse(res, users, 200);
}

const addUser = (req: Request, res: Response) => {
    const userId = makeid(10);
    const newUser = { userId, ...req.body }
    users.push(newUser);
    return successResponse(res, newUser, 200);
}

export default {showUsers, addUser}