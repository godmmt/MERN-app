import { Router } from 'express';
import MailerController from '../controller/mailer.controller.js';

const mailerRouter = Router();

mailerRouter.post('/forgetPassword', MailerController.forgetPassword);
mailerRouter.post('/subscribeNewsLetter', MailerController.subscribeNewsLetter);

export default mailerRouter;
