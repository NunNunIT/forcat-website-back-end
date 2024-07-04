import express from "express";
import { paymentLinkData, updateStatusOrderAfterPayment } from "../controllers/payment.controller.js";
import { verifyAccessToken } from "../middleware/verifyUser.js";
import verifyPaymentData from "../middleware/verifyPaymentData.js";

const router = express.Router();

router.post("/create-payment-link",
  verifyAccessToken,
  paymentLinkData);

router.post("/update-status-order-after-payment",
  verifyPaymentData,
  updateStatusOrderAfterPayment);

export default router;
