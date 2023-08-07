import { Router } from 'express';
import authRouter from './auth.router';
import courseRouter from './course.router';

const apiRouter = Router();

apiRouter.use((req, res, next) => {
  console.log({
    request: req.path,
    query: JSON.stringify(req.query),
    body: JSON.stringify(req.body),
  });
  next();
});

apiRouter.use('/user', authRouter);
apiRouter.use('/courses', courseRouter);

export default apiRouter;
