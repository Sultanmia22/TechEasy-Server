
import express from 'express';
import { userController } from '../controller/user.controller';

const router = express.Router();

router.post('/',userController.register);
router.post('/login',userController.login);
router.post('/socialLogin',userController.socialLogin)

export const userRoute = router