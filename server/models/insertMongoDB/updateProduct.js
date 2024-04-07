import mongoose from 'mongoose';
import Product from "../product.model.js"; // Import model sản phẩm
import Category from "../category.model.js"; // Import model danh mục

// Thiết lập kết nối đến cơ sở dữ liệu MongoDB
mongoose.connect('mongodb+srv://forcat-website-database-admin:jDSXBk9VEcCXpQIX@cluster0.gei9gq5.mongodb.net/FORCATSHOP?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updateProducts() {
  try {
    // Lấy tất cả các sản phẩm từ cơ sở dữ liệu
    const products = await Product.find({});

    // Duyệt qua từng sản phẩm và cập nhật trường category_names
    for (const product of products) {
      // Lấy thông tin của các danh mục từ ObjectId trong trường categories
      const categories = await Category.find({ _id: { $in: product.categories } });

      // Chuyển các thông tin của các danh mục thành mảng tên các danh mục
      const categoryNames = categories.map(category => category.category_name);

      // Cập nhật trường category_names trong sản phẩm
      product.category_names = categoryNames;

      // Lưu sản phẩm đã được cập nhật
      await product.save();
    }


    console.log('Cập nhật sản phẩm thành công!');
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error);
  }
}

// Gọi hàm để cập nhật sản phẩm
updateProducts();