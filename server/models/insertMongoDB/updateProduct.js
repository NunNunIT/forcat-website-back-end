import mongoose from "mongoose";
import Product from "../product.model.js"; // Import model sản phẩm
import Category from "../category.model.js";
import {
  createSlug
} from "../../utils/createSlug.js";

// Thiết lập kết nối đến cơ sở dữ liệu MongoDB
mongoose.connect(
  "mongodb+srv://forcat-website-database-admin:jDSXBk9VEcCXpQIX@cluster0.gei9gq5.mongodb.net/FORCATSHOP?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

function roundPrice(price) {
  if (price >= 1000) {
    // Nếu giá tiền lớn hơn hoặc bằng 1000, làm tròn đến hàng nghìn gần nhất
    return Math.round(price / 1000) * 1000;
  } else {
    // Nếu giá tiền nhỏ hơn 1000, không làm tròn
    return price;
  }
}

async function updateProducts() {
  try {
    // Lấy tất cả các sản phẩm từ cơ sở dữ liệu
    const products = await Product.find({});

    // Duyệt qua từng sản phẩm và cập nhật trường category_names
    for (const product of products) {
      // Lấy thông tin của các danh mục từ ObjectId trong trường categories
      const categories = await Category.find({
        _id: {
          $in: product.categories
        },
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
        // variant.price *= 2;
        // Làm tròn giá tiền
        variant.price = roundPrice(variant.price);
        // Tạo số ngẫu nhiên từ tập hợp {999, 599, 199}
        const randomValues = [0, 999, 599, 199];
        const randomIndex = Math.floor(Math.random() * randomValues.length);
        const randomValue = randomValues[randomIndex];
        // Cộng số ngẫu nhiên vào giá trị đã tăng
        variant.price += randomValue;
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

const updateAllProductsVariantSlugs = async function () {
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

async function updateProductRatings() {
  try {
    // Lấy tất cả sản phẩm từ cơ sở dữ liệu
    const products = await Product.find({});
    // Lặp qua từng sản phẩm
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      // Tạo giá trị ngẫu nhiên trong khoảng từ 3.5 đến 5 với một số thập phân từ 1 đến 5
      const randomRating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
      // Cập nhật giá trị mới cho product_avg_rating
      product.product_avg_rating = parseFloat(randomRating);
      // Lưu sản phẩm đã được cập nhật
      await product.save();
    }
    console.log("Cập nhật đánh giá sản phẩm thành công!");
  } catch (error) {
    console.error("Lỗi khi cập nhật đánh giá sản phẩm:", error);
  }
}

// Gọi hàm để cập nhật đánh giá cho tất cả sản phẩm
updateProductRatings();


// Gọi hàm để cập nhật variant_slug cho tất cả sản phẩm
// updateAllProductsVariantSlugs();

// Gọi hàm để cập nhật sản phẩm
// updateProducts();
// updateProductVariants();