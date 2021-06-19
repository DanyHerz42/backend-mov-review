import {Router} from 'express';
const router = Router();

import {signup, verificationTwice, verifyCode, verifyIfUserExists, login} from '../controllers/auth.controller'
router.post("/signup", signup);
router.post("/verificationTwice", verificationTwice);
router.post("/verifyCode", verifyCode);
router.post("/signin");
router.post("/verifyIfUserExists", verifyIfUserExists);
router.post("/login", login);

export default router;