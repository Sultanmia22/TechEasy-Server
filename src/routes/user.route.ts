
import express from 'express';
import { userController } from '../controller/user.controller';

const router = express.Router();

router.post('/',userController.register);
router.get('/',userController.login)

export const userRoute = router