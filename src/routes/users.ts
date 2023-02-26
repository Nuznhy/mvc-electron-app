import express from 'express';
import controller from '../controller/users'

const router = express.Router()

router.get('/show', controller.showUsers);
router.post('/add', controller.addUser);

export = router