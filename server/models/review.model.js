import mongoose from "mongoose";
import { createSlug } from "../utils/createSlug.js";

const reviewSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    user_id: {
      type: String,
      required: true,
    },
    order_id: {
      type: String,
      required: true,
    },
    review_rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    review_context: String,
    review_imgs: [
      {
        link: String,
        alt: String,
      },
    ],
    review_video: [
      {
        link: String,
        alt: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
