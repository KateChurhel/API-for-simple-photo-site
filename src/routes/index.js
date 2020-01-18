import express from 'express';

import PhotosRouter from './photos';
import UsersRouter from './users';
import SupportRouter from './support';

module.exports = express
    .Router()
    .use('/photos', PhotosRouter)
    .use('/users', UsersRouter)
    .use('/support', SupportRouter);
