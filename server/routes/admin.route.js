import { verifyAdminAccessToken } from "../middleware/verifyUser.js";
import express from "express";

import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProducts,
} from "../controllers/admin/product.controller.js";
import {
  getOrders,
  getOrder,
  updateOrderStatus,
} from "../controllers/admin/order.controller.js";
import {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
} from "../controllers/admin/article.controller.js";

import upload from "../middleware/handleFile.js";

const router = express.Router();

router.post("/products/addProduct", verifyAdminAccessToken, addProduct);
router.post("/products/updateProduct", verifyAdminAccessToken, updateProduct);
router.post("/products/deleteProducts", verifyAdminAccessToken, deleteProducts);

router.get("/products/getProducts", verifyAdminAccessToken, getProducts);
router.get("/products/:pid", verifyAdminAccessToken, getProduct);

router.get("/orders/", verifyAdminAccessToken, getOrders);
router.get("/orders/:order_id", verifyAdminAccessToken, getOrder);
router.post("/orders/", verifyAdminAccessToken, updateOrderStatus);

// Article
router.post(
  "/articles/",
  verifyAdminAccessToken,
  upload("article_avt_blob"),
  createArticle
); // create Article
router.get("/articles/", verifyAdminAccessToken, getArticles); // get all Articles
router.get("/articles/:article_id_hashed", verifyAdminAccessToken, getArticle); // get Article by ID
router.post(
  "/articles/:article_id_hashed",
  verifyAdminAccessToken,
  upload("article_avt_blob"),
  updateArticle
); // update Article by ID

export default router;
