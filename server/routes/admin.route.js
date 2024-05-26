import { verifyAdminAccessToken } from "../middleware/verifyUser.js";
import express from "express";

import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
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

const router = express.Router();

router.post("/product/addProduct", verifyAdminAccessToken, addProduct);
router.post("/product/updateProduct", verifyAdminAccessToken, updateProduct);
router.post("/product/deleteProduct", verifyAdminAccessToken, deleteProduct);

router.get("/product/getProducts", verifyAdminAccessToken, getProducts);
router.get("/product/:pid", verifyAdminAccessToken, getProduct);

router.get("/orders/", verifyAdminAccessToken, getOrders);
router.get("/orders/:order_id", verifyAdminAccessToken, getOrder);
router.post("/orders/", verifyAdminAccessToken, updateOrderStatus);

// Article
router.post("/articles/", verifyAdminAccessToken, createArticle); // create Article
router.get("/articles/", verifyAdminAccessToken, getArticles); // get all Articles
router.get("/articles/:article_id_hashed", verifyAdminAccessToken, getArticle); // get Article by ID
router.post("/articles/:article_id_hashed", verifyAdminAccessToken, updateArticle); // update Article by ID

export default router;
