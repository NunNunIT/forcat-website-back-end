import express from 'express';
import { edit, changePassword,  getUserByEmail, deleteUserByEmail } from '../controllers/user.controller.js'

const router = express.Router();

// 2 api này chỉ dùng để test edit và change resetPassword. không sử dụng trong thực tế
router.get("/get-user", getUserByEmail);
router.delete("/delete", deleteUserByEmail);

//api được sử dụng
router.put("/edit", edit);
router.put("/change-password", changePassword);

export default router;