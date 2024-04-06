import express from "express";

import { getOverview } from "../controllers/review.controller.js";

const router = express.Router();

router.get("/getOverview/:product_id", getOverview);

export default router;
