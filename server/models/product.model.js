import mongoose from "mongoose";
import { createSlug } from "../utils/createSlug.js";

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_slug: {
      type: String,
      required: true,
      unique: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    product_imgs: [
      {
        link: String,
        alt: String,
      },
    ],
    product_avg_rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    product_short_description: String,
    product_description: String,
    product_detail: Object,
    product_variants: [
      {
        variant_id: {
          type: String,
          required: true,
        },
        variant_name: String,
        price: Number,
        variant_imgs: [
          {
            link: String,
            alt: String,
          },
        ],
        discount_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Discount",
        },
        discount_amount: Number,
        is_available: Boolean,
        in_stock: Number,
      },
    ],
    recent_reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    product_supp_price: Number,
  },
  { timestamps: true }
);

productSchema.pre('save', function(next) {
  this.product_slug = createSlug(this.product_name);
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
