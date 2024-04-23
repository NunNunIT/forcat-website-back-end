import express from "express";
import { verifyAccessToken } from "../middleware/verifyUser.js";

import {
  getCart,
  updateCart,
  addCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", verifyAccessToken, getCart);
router.post("/addCart", verifyAccessToken, addCart);
router.post("/updateCart", verifyAccessToken, updateCart);

export default router;
