import { users } from '../model/users';

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


export const showUsers = () => {
    return users;
}

export const addUser = (userData: any) => {
    const userId = makeid(10);
    const newUser = { userId, ...userData }
    users.push(newUser);
    return newUser;
}