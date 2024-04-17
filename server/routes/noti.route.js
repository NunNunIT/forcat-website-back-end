import express from "express";
import {
  getAllNoti,
  setReadNoti,
  setReadAllNoti,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", getAllNoti);
router.post("/:noti_id/read", setReadNoti);
router.post("/readAll", setReadAllNoti);

export default router;
