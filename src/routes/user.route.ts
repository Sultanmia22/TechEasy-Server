
import express from 'express';
import { userController } from '../controller/user.controller';

const router = express.Router();

router.post('/',userController.register);

export const userRoute = router