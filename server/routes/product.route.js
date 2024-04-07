import express from "express";
import {
  searchProductList,
  getNewestProducts,
  getTopRatedProducts,
  getProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/search", searchProductList);
router.get("/getNewestProducts", getNewestProducts);
router.get("/getTopRatedProducts", getTopRatedProducts);
router.get("/:product_slug", getProduct);

export default router;
