import mongoose from "mongoose";
import Product from "../product.model.js"; // Import model sản phẩm
import Category from "../category.model.js"; 
import { createSlug } from "../../utils/createSlug.js";

// Thiết lập kết nối đến cơ sở dữ liệu MongoDB
mongoose.connect(
  "mongodb+srv://forcat-website-database-admin:jDSXBk9VEcCXpQIX@cluster0.gei9gq5.mongodb.net/FORCATSHOP?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function updateProducts() {
  try {
    // Lấy tất cả các sản phẩm từ cơ sở dữ liệu
    const products = await Product.find({});

    // Duyệt qua từng sản phẩm và cập nhật trường category_names
    for (const product of products) {
      // Lấy thông tin của các danh mục từ ObjectId trong trường categories
      const categories = await Category.find({
        _id: { $in: product.categories },
      });

      // Chuyển các thông tin của các danh mục thành mảng tên các danh mục
      const categoryNames = categories.map(
        (category) => category.category_name
      );

      // Cập nhật trường category_names trong sản phẩm
      product.category_names = categoryNames;

      // Lưu sản phẩm đã được cập nhật
      await product.save();
    }
    console.log("Cập nhật sản phẩm thành công!");
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
  }
}

async function updateProductVariants() {
  try {
    const products = await Product.find({});
    // Lặp qua từng sản phẩm
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      // Lặp qua từng biến thể của sản phẩm
      for (let j = 0; j < product.product_variants.length; j++) {
        const variant = product.product_variants[j];
        // Tăng giá lên 100%
        variant.price *= 2;
        // Kiểm tra nếu có discount_id
        if (variant.discount_id) {
          // Đặt discount_amount thành 10
          variant.discount_amount = 10;
        }
      }
      // Lưu sản phẩm đã được cập nhật
      await product.save();
    }
    console.log("Cập nhật sản phẩm thành công!");
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
  }
}

const updateAllProductsVariantSlugs = async function() {
  try {
    // Lấy tất cả sản phẩm từ cơ sở dữ liệu
    const products = await Product.find();

    // Lặp qua từng sản phẩm và cập nhật lại variant_slug
    products.forEach((product) => {
      createSlug(product);
      // Lưu sản phẩm sau khi cập nhật
      product.save();
    });

    console.log("Cập nhật variant_slug cho tất cả sản phẩm thành công!");
  } catch (error) {
    console.error("Lỗi khi cập nhật variant_slug cho tất cả sản phẩm:", error);
  }
};

// Gọi hàm để cập nhật variant_slug cho tất cả sản phẩm
updateAllProductsVariantSlugs();

// Gọi hàm để cập nhật sản phẩm
// updateProducts();
// updateProductVariants();
