import express from "express";
import { verifyAccessToken } from "../middleware/verifyUser.js";

import {
  getCart,
  updateCart,
  addCart,
} from "../controllers/cart.controller.js";
import { decryptData } from "../utils/security.js";

const router = express.Router();

// router.post("/", (req, res) => {
//   console.log(decryptData(req.body.product_id));
// });
router.get("/", verifyAccessToken, getCart);
router.post("/addCart", addCart);
router.post("/updateCart", verifyAccessToken, updateCart);

export default router;
