import mongoose from "mongoose";
import { createSlug } from "../utils/createSlug.js";

const reviewSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  product_variant_name: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  user_info: {
    user_name: {
      type: String,
      required: true
    },
    user_avt: String
  },
  review_rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  review_context: String,
  review_imgs: [{
    link: String,
    alt: String
  }],
  review_video: [{
    link: String,
    alt: String
  }]
}, {
  timestamps: true
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
