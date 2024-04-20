import express from 'express';
import { edit, getInfoUser, changePassword } from '../controllers/user.controller.js'
import { verifyAccessToken } from "../middleware/verifyUser.js"

const router = express.Router();

// 2 api này chỉ dùng để test edit và change resetPassword. không sử dụng trong thực tế
// router.get("/get-user", getUserByEmail);
// router.delete("/delete", deleteUserByEmail);

//api được sử dụng
router.post("/getInfo", verifyAccessToken, getInfoUser);
router.put("/edit", verifyAccessToken, edit);
router.put("/change-password", verifyAccessToken, changePassword);

export default router;