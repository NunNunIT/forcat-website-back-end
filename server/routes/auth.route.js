import express from 'express';
import { register, login, loginWithGoogle, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/login/google", loginWithGoogle);
router.post("/logout", logout);

export default router;