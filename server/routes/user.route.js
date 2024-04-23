import express from 'express';
import { edit, getInfoUser, changePassword } from '../controllers/user.controller.js'
import { verifyAccessToken } from "../middleware/verifyUser.js"

const router = express.Router();

//api được sử dụng
router.post("/getInfo", verifyAccessToken, getInfoUser);
router.put("/edit", verifyAccessToken, edit);
router.put("/change-password", verifyAccessToken, changePassword);

export default router;