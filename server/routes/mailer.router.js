import { Router } from 'express';
import { MailerController } from '../controller/index.js';
import { ResetPasswordValidator } from '../validations/index.js';

const mailerRouter = Router();

mailerRouter.post('/reset-password', ResetPasswordValidator.hasEmailInfo, MailerController.resetPassword);
mailerRouter.post('/subscribe-newsletter', MailerController.subscribeNewsLetter);
mailerRouter.post('/unsubscribe-newsletter', MailerController.unsubscribeNewsletter);

export default mailerRouter;
