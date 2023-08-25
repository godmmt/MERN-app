import { Router } from 'express';
import { AuthController } from '../controller/index.js';

const authRouter = Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);
authRouter.post('/refresh-token', AuthController.refreshToken);
authRouter.post('/revoke-token', AuthController.revokeToken);

export default authRouter;
