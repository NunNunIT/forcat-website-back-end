import express from "express";

import {
  createOrUpdate,
  getOverview,
  getFilteredReviews,
} from "../controllers/review.controller.js";

import { verifyAccessToken } from "../middleware/verifyUser.js"

const router = express.Router();

router.post("/", verifyAccessToken, createOrUpdate);

router.get("/getOverview/:product_id", getOverview);

router.get('/filter', getFilteredReviews);

export default router;