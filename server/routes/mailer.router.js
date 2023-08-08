import { Router } from 'express';
import { MailerController } from '../controller/index.js';

const mailerRouter = Router();

mailerRouter.post('/forgetPassword', MailerController.forgetPassword);
mailerRouter.post('/subscribeNewsLetter', MailerController.subscribeNewsLetter);

export default mailerRouter;
