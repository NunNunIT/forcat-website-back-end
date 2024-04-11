import express from "express";
import { getProduct, getRecommend } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/:pid", getProduct);
router.get("/getRecommend/:product_id", getRecommend);

export default router;
