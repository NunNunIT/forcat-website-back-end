import mongoose from "mongoose";
import { createSlug } from "../utils/createSlug.js";
import Category from "./category.model.js"; // Import model danh mục

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
    category_names: [
      {
        type: String,
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
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
    product_sold_quanity: {
      type: Number,
      min: 0,
      default: 0,
    },
    product_short_description: String,
    product_description: String,
    product_detail: Object,
    product_variants: [
      {
        variant_name: String,
        variant_slug: String,
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
    review_count: [Number],
    recent_images: [
      {
        link: String,
        alt: String,
      },
    ],
    recent_videos: [
      {
        link: String,
        alt: String,
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

// // Middleware để cập nhật category_names
// productSchema.pre("save", async function (next) {
//   try {
//     // Lấy thông tin của các danh mục từ ObjectId trong trường categories
//     const categories = await Category.find({
//       _id: { $in: product.categories },
//     });

//     // Chuyển các thông tin của các danh mục thành mảng tên các danh mục
//     const categoryNames = categories.map((category) => category.category_name);

//     // Cập nhật trường category_names trong sản phẩm
//     this.category_names = categoryNames;

//     // Lưu sản phẩm đã được cập nhật
//     // await product.save();
//     next();

//     console.log("Cập nhật sản phẩm thành công!");
//   } catch (error) {
//     console.error("Lỗi khi cập nhật sản phẩm:", error);
//   }
// });

productSchema.pre("save", function (next) {
  this.product_slug = createSlug(this.product_name);
  // Lặp qua mỗi phần tử trong mảng product_variants
  this.product_variants.forEach((variant) => {
    // Tạo slug mới từ variant_name và gán cho variant_slug
    variant.variant_slug = createSlug(variant.variant_name);
  });
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
