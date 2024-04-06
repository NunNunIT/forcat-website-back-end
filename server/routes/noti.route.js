import express from "express";
import {
  getNoti,
  readNoti,
  readAllNoti,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/getNoti/:user_id", getNoti);
router.post("/readNoti/:user_id/:noti_id", readNoti);
router.post("/readAllNoti/:user_id", readAllNoti);

export default router;
