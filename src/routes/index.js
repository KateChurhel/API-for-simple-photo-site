const express = require( 'express'),
    PhotosRouter = require( '../controllers/photos'),
    UsersRouter = require( '../controllers/users'),
    SupportRouter = require( '../controllers/support');

module.exports = express
    .Router()
    .use('/photos', PhotosRouter)
    .use('/users', UsersRouter)
    .use('/support', SupportRouter);
