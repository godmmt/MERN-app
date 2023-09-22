import { Router } from 'express';
import { AuthController } from '../controller/index.js';
import { AuthValidator } from '../validations/index.js';

const authRouter = Router();

authRouter.post('/register', AuthValidator.hasRegisterInfo, AuthController.register);
authRouter.post('/login', AuthValidator.hasLoginInfo, AuthController.login);
// authRouter.post('/refresh-token', AuthController.refreshToken);
// authRouter.post('/revoke-token', AuthController.revokeToken);

export default authRouter;
