import express from 'express';
import { edit, changePassword } from '../controllers/user.controller.js'

const router = express.Router();

router.put("/edit", edit);
router.put("/change-password", changePassword);

export default router;