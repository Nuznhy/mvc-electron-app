import express from 'express';
import users from './routes/users';
import logging from './logging';

const port = 8080
const api = express();
api.use(express.json())
api.use(express.urlencoded({extended: true}))

api.use(logging.logRequest);
api.use('/users', users)

api.listen(port, () => {
   console.log(`Running on localhost:${port}`)
})