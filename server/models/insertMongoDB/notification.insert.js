import mongoose from "mongoose";
import Notification from "../notification.model.js";
// import { createSlug } from "../utils/createSlug.js";

// // Hàm tạo một slug từ tên thông báo
// function generateSlug(name) {
//   return createSlug(name);
// }

// Thiết lập kết nối đến cơ sở dữ liệu MongoDB
mongoose.connect(
  "mongodb+srv://forcat-website-database-admin:jDSXBk9VEcCXpQIX@cluster0.gei9gq5.mongodb.net/FORCATSHOP?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Dữ liệu mẫu cho notification
const notificationData = [
  {
    notification_name: "Thông báo mẫu 1",
    notification_slug: "thong-bao-mau-1",
    notification_type: "order",
    notification_description: "mo ta thong báo 2",
    users: {
      isAll: true,
      usersList: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    },
  },
  {
    notification_name: "Thông báo mẫu 2",
    notification_slug: "thong-bao-mau-2",
    notification_type: "promotion",
    notification_description: "mo ta thong báo 3",
    users: {
      isAll: true,
      usersList: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    },
  },
  {
    notification_name: "Thông báo mẫu 3",
    notification_slug: "thong-bao-mau-3",
    notification_type: "order",
    notification_description: "mo ta thong báo 5",
    users: {
      isAll: false,
      usersList: [new mongoose.Types.ObjectId()],
    },
  },
  {
    notification_name: "Thông báo mẫu 5",
    notification_slug: "thong-bao-mau-5",
    notification_type: "order",
    notification_description: "mo ta thong báo 5",
    users: {
      isAll: false,
      usersList: [new mongoose.Types.ObjectId()],
    },
  },
];

// Tạo một thông báo mới và lưu vào cơ sở dữ liệu
Notification.create(notificationData)
  .then((notification) => {
    console.log("Thông báo đã được thêm vào cơ sở dữ liệu:", notification);
  })
  .catch((error) => {
    console.error("Đã xảy ra lỗi khi thêm thông báo:", error);
  });
