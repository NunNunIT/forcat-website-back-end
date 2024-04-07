import User from "../user.model.js";
import mongoose from "mongoose";

// Thiết lập kết nối đến cơ sở dữ liệu MongoDB
mongoose.connect(
  "mongodb+srv://forcat-website-database-admin:jDSXBk9VEcCXpQIX@cluster0.gei9gq5.mongodb.net/FORCATSHOP?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

/// Tạo mảng chứa dữ liệu cho hai bài viết
const data = [
  {
    user_login_name: "ldmtest",
    user_name: "John Doe",
    user_password: "hashed_password_here",
    user_avt_img: "https://example.com/avatar.jpg",
    user_birth: "1990-05-15",
    user_gender: "male",
    user_email: "ldmtest@example.com",
    user_phone: "123456789",
    user_address: {
      street: "123 Main St",
      ward: "Ward 1",
      district: "District A",
      province: "Province X",
    },
    current_orders: [],
    recent_notification: [],
    recommended_products: [],
    cart: [
      {
        product: new mongoose.Types.ObjectId("660d58878be4c0f5e0b5c36e"),
        variant_id: "p002_1",
        quantity: 2,
      },
      {
        product: new mongoose.Types.ObjectId("660d58878be4c0f5e0b5c37e"),
        variant_id: "p003_3",
        quantity: 1,
      },
    ],
    user_role: "user",
    user_active: true,
  },
];

// Sử dụng phương thức create để chèn user mới vào cơ sở dữ liệu
User.create(data)
  .then((d) => {
    console.log("User đã được thêm vào cơ sở dữ liệu:", d);
  })
  .catch((error) => {
    console.error("Đã xảy ra lỗi khi thêm user:", error);
  });
