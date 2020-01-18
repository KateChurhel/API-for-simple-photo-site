import express from 'express';
import { validateToken } from '../helpers/authentication';

import * as UsersController from '../controllers/users';

export default express
    .Router()
    .post('/authenticate', UsersController.authenticate)
    .post('/register', UsersController.register)
    .get('/', validateToken, UsersController.getAllUsers)
    .get('/current', validateToken, UsersController.getCurrentUser)
    .put('/:id', validateToken, UsersController.updateUser)
    .get('/:id', validateToken, UsersController.getUserById)
    .delete('/:id', validateToken, UsersController.deleteUser);
