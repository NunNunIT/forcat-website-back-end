import express from "express";

import {
  getCart,
  updateCart,
  addCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/:user_id", getCart);
router.post("/addCart/:user_id", addCart);
router.post("/updateCart/:user_id", updateCart);

export default router;
