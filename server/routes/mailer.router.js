import { Router } from 'express';
import { MailerController } from '../controller/index.js';
import { RecoverPasswordValidator } from '../validations/index.js';

const mailerRouter = Router();

mailerRouter.post('/recover-password', RecoverPasswordValidator.hasEmailInfo, MailerController.recoverPassword);
mailerRouter.post('/subscribe-newsletter', MailerController.subscribeNewsLetter);
mailerRouter.post('/unsubscribe-newsletter', MailerController.unsubscribeNewsletter);

export default mailerRouter;
