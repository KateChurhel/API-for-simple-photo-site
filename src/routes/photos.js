import express from 'express';
import { validateToken } from '../helpers/authentication';

import * as PhotoController from '../controllers/photos';

export default express
    .Router()
    .get('/', PhotoController.getAllPhotos)
    .get('/tags', PhotoController.getAllTags)
    .get('/tags/:tag', PhotoController.getPhotoByTag)
    .put('/:id', validateToken, PhotoController.updatePhoto)
    .delete('/:id', validateToken, PhotoController.deletePhoto)
    .get('/:id', validateToken, PhotoController.getPhotoById)
    .get('/user/:id', validateToken, PhotoController.getAllPhotosByUserId)
    .post('/add-photo', validateToken, PhotoController.addPhoto);

