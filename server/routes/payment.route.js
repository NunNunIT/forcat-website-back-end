import express from "express";
import { paymentLinkData } from "../controllers/payment.controller.js";
import { verifyAccessToken } from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/create-payment-link",
    // verifyAccessToken, 
    paymentLinkData);

export default router;
