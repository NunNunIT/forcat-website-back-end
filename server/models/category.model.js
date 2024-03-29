import mongoose from "mongoose";
import { createSlug } from "../utils/createSlug.js";

const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    category_slug: {
      type: String,
      required: true,
      unique: true,
    },
    category_img: {
      type: String,
      required: true,
    },
    category_short_description: String,
  },
  { timestamps: true }
);

categorySchema.pre('save', function(next) {
  this.category_slug = createSlug(this.category_name);
  next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
