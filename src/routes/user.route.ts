
import express from 'express';
import { userController } from '../controller/user.controller';
import verifyToken from '../middleware/authMiddleware';

const router = express.Router();

router.post('/',userController.register);
router.post('/login',userController.login);
router.post('/socialLogin',userController.socialLogin)
router.patch('/savedPersonalInfo',verifyToken,userController.savePersonalInfo)
router.get('/getPersonalInfo',verifyToken,userController.getPersonalInfo)
router.patch('/saveAddress',verifyToken,userController.saveAddress)
router.get('/getAddress',verifyToken,userController.getAddress)
router.delete('/deleteAddress',userController.deleteAddress)

export const userRoute = router