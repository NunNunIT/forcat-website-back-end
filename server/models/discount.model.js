import mongoose from "mongoose";
import { createSlug } from "../utils/createSlug.js";

const discountSchema = new mongoose.Schema(
  {
    discount_name: {
      type: String,
      required: true,
    },
    discount_amount: {
      type: Number,
      required: true,
    },
    discount_start_date: {
      type: Date,
      required: true,
    },
    discount_end_date: {
      type: Date,
      required: true,
    },
    products: {
      isAll: {
        type: Boolean,
        default: false,
      },
      productsList: [
        {
          product_id: {
            type: String,
            ref: "Product",
          },
        },
      ],
    },
  },
  { timestamps: true }
);

const Discount = mongoose.model("Discount", discountSchema);
export default Discount;
