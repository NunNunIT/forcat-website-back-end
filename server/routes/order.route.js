import express from "express";
import { verifyAccessToken } from "../middleware/verifyUser.js";
import {
  create,
  readAll,
  readOne,
  update,
  updateStatus,
  readAllReviews,
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
router.get('/:order_id',
  // verifyAccessToken,
  readOne);

// Update a purchase with id
router.post("/:order_id/edit",
  // verifyAccessToken,
  update);

// Update a purchase status with id
router.post("/:order_id/:order_status",
  // verifyAccessToken,
  updateStatus);

// Read all reviews
router.get('/:order_id/reviews',
  // verifyAccessToken,
  readAllReviews);


export default router;
