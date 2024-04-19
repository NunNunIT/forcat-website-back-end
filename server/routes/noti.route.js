import express from "express";
import {
  getAllNoti,
  setReadNoti,
  setReadAllNoti,
} from "../controllers/notification.controller.js";

import { verifyAccessToken } from "../middleware/verifyUser.js"

const router = express.Router();

router.get("/", verifyAccessToken, getAllNoti);
router.post("/:noti_id/read", verifyAccessToken, setReadNoti);
router.post("/readAll", verifyAccessToken, setReadAllNoti);

export default router;
