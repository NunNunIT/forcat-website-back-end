import express from "express";
import { verifyAccessToken } from "../middleware/verifyUser.js";
import {
  create,
  readAll,
  readOne,
  update,
  updateStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/",
  // verifyAccessToken,
  create);

// Read all purchases
router.get('/',
  // verifyAccessToken,
  readAll);

// Read a purchase with id
router.get('/:id',
  // verifyAccessToken,
  readOne);

// Update a purchase with id
router.post("/:id/edit",
  // verifyAccessToken,
  update);

// Update a purchase status with id
router.post("/:id/:status",
  // verifyAccessToken,
  updateStatus);


export default router;
