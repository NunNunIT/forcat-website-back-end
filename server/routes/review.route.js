import express from "express";

import { getOverview, getFilteredReviews } from "../controllers/review.controller.js";

const router = express.Router();

router.get("/getOverview/:product_id", getOverview);

router.get('/filter', getFilteredReviews);

export default router;