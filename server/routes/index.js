import { Router } from 'express';
import authRouter from './auth.router.js';
import courseRouter from './course.router.js';
import mailerRouter from './mailer.router.js';

const apiRouter = Router();

apiRouter.use('/user', authRouter);
apiRouter.use('/courses', courseRouter);
apiRouter.use('/mailer', mailerRouter);

export default apiRouter;
