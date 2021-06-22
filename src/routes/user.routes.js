import {Router} from 'express';
import { getUserInfo } from '../controllers/user.controller';
import {verifyToken} from '../middlewares/jwt.auth';
const router = Router();



router.get('/get-user-data', verifyToken, getUserInfo);

export default router;