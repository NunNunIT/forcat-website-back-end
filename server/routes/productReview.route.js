import express from "express";
import { getFilteredReviews } from "../controllers/productReview.controller.js";

const router = express.Router();

router.get('/filter', getFilteredReviews);

export default router;