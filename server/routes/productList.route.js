import express from 'express';
import { searchProductList, getNewestProducts, getTopRatedProducts } from '../controllers/productList.controller.js';

const router = express.Router();

router.get("/search", searchProductList)
router.get("/getNewestProducts", getNewestProducts)
router.get("/getTopRatedProducts", getTopRatedProducts)

export default router;