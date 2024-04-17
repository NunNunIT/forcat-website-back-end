import express from "express";

import {
  createOrUpdate,
  getOverview,
  getFilteredReviews,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", createOrUpdate);

router.get("/getOverview/:product_id", getOverview);

router.get('/filter', getFilteredReviews);

export default router;