import mongoose from "mongoose";
import { createSlug } from "../utils/createSlug.js";

const userSchema = new mongoose.Schema(
  {
    user_login_name: {
      type: String,
      unique: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    user_password: {
      type: String,
      required: true,
    },
    user_avt_img: {
      type: String,
      default:
        "https://gcs.tripi.vn/public-tripi/tripi-feed/img/474187OKi/anh-avatar-con-meo-cute_051723184.jpg",
    },
    user_birth: {
      type: Date,
    },
    user_gender: {
      type: String,
    },
    user_email: {
      type: String,
      required: true,
      unique: true,
    },
    user_phone: {
      type: String,
    },
    user_address: {
      street: String,
      ward: String,
      district: String,
      province: String,
    },
    current_orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    recent_notification: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
    recommended_products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        variant_id: {
          type: String,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    user_role: {
      type: String,
      default: "user",
    },
    user_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
