import express from "express";
import {
  create,
  readUnlimited,
  readAll,
  readOne,
  update,
} from "../controllers/article.controller.js";

const router = express.Router();

// create
router.post("/", create);

// readAll
router.get("/", readAll);

// readUnlimited
router.get("/unlimited", readUnlimited);

// readOne
router.get("/:slug/:aid", readOne);

// update
router.post("/edit/:slug/:aid", update);


export default router;