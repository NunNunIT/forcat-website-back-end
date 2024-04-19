import express from "express";
import { verifyAccessToken } from "../middleware/verifyUser.js"

import {
  getCart,
  updateCart,
  addCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/:user_id", verifyAccessToken, getCart);
router.post("/addCart/:user_id", verifyAccessToken, addCart);
router.post("/updateCart/:user_id", verifyAccessToken, updateCart);

export default router;
