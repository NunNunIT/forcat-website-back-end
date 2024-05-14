import express from "express";

import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/admin/product.controller.js";

const router = express.Router();

router.post("/product/addProduct", addProduct);
router.post("/product/updateProduct", updateProduct);
router.post("/product/deleteProduct", deleteProduct);

router.get("/product/getProducts", getProducts);
router.get("/product/:pid", getProduct);

export default router;
