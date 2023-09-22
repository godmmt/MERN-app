import { Router } from 'express';
import { MailerController } from '../controller/index.js';

const mailerRouter = Router();

mailerRouter.post('/forget-password', MailerController.forgetPassword);
mailerRouter.post('/subscribe-newsletter', MailerController.subscribeNewsLetter);

export default mailerRouter;
