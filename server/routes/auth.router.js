import { Router } from 'express';
import { AuthController } from '../controller/index.js';
import { AuthValidator } from '../validations/index.js';
import passport from 'passport';

const authRouter = Router();

authRouter.get('/user-info', passport.authenticate('jwt', { session: false }), AuthController.getUserInfo);
authRouter.post('/register', AuthValidator.hasRegisterInfo, AuthController.register);
authRouter.post('/login', AuthValidator.hasLoginInfo, AuthController.login);

// authRouter.post('/refresh-token', AuthController.refreshToken);
// authRouter.post('/revoke-token', AuthController.revokeToken);

export default authRouter;
