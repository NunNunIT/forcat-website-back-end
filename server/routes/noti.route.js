import express from "express";
import {
  getAllNoti,
  setReadNoti,
  setReadAllNoti,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/getNoti/:user_id", getAllNoti);
router.post("/readNoti", setReadNoti);
router.post("/readAllNoti", setReadAllNoti);

export default router;
