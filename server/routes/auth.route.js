import express from "express";
import {
  register,
  login,
  loginWithGoogle,
  logout,
  forgot,
  resetPassword,
} from "../controllers/auth.controller.js";
import { verifyOtp } from "../middleware/verifyOTP.js";
import { verifyUserAccessToken } from "../middleware/verifyUser.js";
import cookieParser from "cookie-parser";

const router = express.Router();


router.use(cookieParser());

router.post("/verify-access-token", verifyUserAccessToken);
router.post("/register", register);
router.post("/login", login);
router.post("/login/google", loginWithGoogle);
router.get("/logout", logout);
router.post("/forgot", forgot);
router.post("/verify-otp", verifyOtp);
router.put("/reset-password", resetPassword);

export default router;
