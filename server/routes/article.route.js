import express from "express";
import {
  readUnlimited,
  readAll,
  readOne,
} from "../controllers/article.controller.js";

const router = express.Router();

// readAll
router.get("/", readAll);

// readUnlimited
router.get("/unlimited", readUnlimited);

// readOne
router.get("/:slug/:aid", readOne);


export default router;