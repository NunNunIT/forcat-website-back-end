import mongoose from "mongoose";
import { createSlug } from "../utils/createSlug.js";

const paymentSchema = new mongoose.Schema(
  {
    customer_id: {
      type: String,
      required: true,
      ref: "User", // Tham chiếu đến collection người dùng (User)
    },
    payment_status: {
      type: String,
      required: true,
    },
    payment_gateway: String,
    payment_type: String,
    payment_amount: {
      type: Number,
      required: true,
    },
    payment_card: {
      brand: String,
      expirationMonth: String,
      expirationYear: String,
      CVV: String,
      payment_token: String,
    },
  },
  { timestamps: true }
);

const Payment =  mongoose.model("Payment", paymentSchema);
export default Payment;