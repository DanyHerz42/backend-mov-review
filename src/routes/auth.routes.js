import {Router} from 'express';
const router = Router();
import { isAdmin } from '../middlewares/jwt.auth';
import {signup, verificationTwice, verifyCode, verifyIfUserExists, login, authAdmin} from '../controllers/auth.controller'
router.post("/signup", signup);
router.post("/verificationTwice", verificationTwice);
router.post("/verifyCode", verifyCode);
router.post("/verifyIfUserExists", verifyIfUserExists);
router.post("/login", login);
router.post("/auth-admin", isAdmin, authAdmin);

export default router;