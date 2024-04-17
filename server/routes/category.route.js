import express from "express";

import { getCategoriesList } from "../controllers/category.controller.js";

const router = express.Router();

router.get("/getCategory", getCategoriesList);

export default router;
