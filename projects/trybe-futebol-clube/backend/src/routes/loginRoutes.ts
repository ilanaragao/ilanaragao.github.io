import { Router } from 'express';
import loginValidate from '../middlewares/loginValidate';
import loginControllers from '../controllers/loginControllers';

const loginRouter = Router();

loginRouter.get('/validate', loginControllers.validate);
loginRouter.post(
  '/',
  loginValidate.emailValidate,
  loginValidate.passwordValidate,
  loginControllers.login,
);

export default loginRouter;
