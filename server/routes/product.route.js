import express from "express";
import { getProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/:product_slug", getProduct);

export default router;
