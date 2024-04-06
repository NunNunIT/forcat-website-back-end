import express from 'express';
import { register, login, loginWithGoogle, logout, forgot } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/login/google", loginWithGoogle);
router.get("/logout", logout);
router.post("/forgot", forgot);

export default router;