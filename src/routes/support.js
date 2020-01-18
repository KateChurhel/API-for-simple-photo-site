import express from 'express';

import * as PhotoController from '../controllers/support';

export default express
    .Router()
    .post('/send-email', PhotoController.SendEmails);

