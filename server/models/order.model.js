import mongoose from "mongoose";
import { createSlug } from "../utils/createSlug.js";

const orderSchema = new mongoose.Schema(
  {
    customer_id: {
      type: String,
      required: true,
      ref: "User", // Tham chiếu đến collection người dùng (User)
    },
    staff_id: {
      type: String,
      ref: "User", // Tham chiếu đến collection nhân viên (Staff), nếu có
    },
    payment_id: {
      type: String,
      required: true,
      ref: "Payment", // Tham chiếu đến collection thanh toán (Payment)
    },
    order_buyer: {
      order_name: String,
      order_phone: String,
    },
    order_address: {
      street: String,
      ward: String,
      district: String,
      province: String,
    },
    order_note: String,
    order_shipping_cost: Number,
    order_total_cost: Number,
    order_process_info: [
      {
        status: String,
        date: Date,
      },
    ],
    order_details: [
      {
        product_id: {
          type: String,
          ref: "Product", // Tham chiếu đến collection sản phẩm (Product)
        },
        quantity: Number,
        unit_price: Number,
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;