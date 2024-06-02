import Article from "../article.model.js";
import mongoose from "mongoose";

// Thiết lập kết nối đến cơ sở dữ liệu MongoDB
mongoose.connect('mongodb+srv://forcat-website-database-admin:jDSXBk9VEcCXpQIX@cluster0.gei9gq5.mongodb.net/FORCATSHOP?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/// Tạo mảng chứa dữ liệu cho hai bài viết
const data = [
  {
    article_name: "Tôi mới tạo 11",
    article_type: "Hướng dẫn và chăm sóc",
    article_short_description: "Mô tả ngắn về bài viết 1",
    article_info: {
      author: "Tác giả bài viết 1",
      published_date: new Date("2024-03-26"),
    },
    article_description: [
      {
        type: "title",
        content: "Tiêu đề bài viết 1",
        article_date: new Date("2024-03-26"),
      },
      {
        type: "image",
        url: "Đường dẫn đến hình ảnh 1",
        alt: "Mô tả hình ảnh 1",
        caption: "Chú thích hình ảnh 1",
        article_date: new Date("2024-03-26"),
      },
      // Các phần khác của bài viết 1
    ]
  },
  {
    article_name: "Tôi mới tạo 2",
    article_type: "Hướng dẫn và chăm sóc",
    article_short_description: "Mô tả ngắn về bài viết 2",
    article_info: {
      author: "Tác giả bài viết 2",
      published_date: new Date("2024-03-27"),
    },
    article_description: [
      {
        type: "title",
        content: "Tiêu đề bài viết 2",
        article_date: new Date("2024-03-27"),
      },
      {
        type: "image",
        url: "Đường dẫn đến hình ảnh 2",
        alt: "Mô tả hình ảnh 2",
        caption: "Chú thích hình ảnh 2",
        article_date: new Date("2024-03-27"),
      },
      // Các phần khác của bài viết 2
    ]
  }
];
// Sử dụng phương thức create để chèn bài viết mới vào cơ sở dữ liệu
Article.create(data)
  .then(d => {
    // console.log("Bài viết đã được thêm vào cơ sở dữ liệu:", d);
  })
  .catch(error => {
    console.error("Đã xảy ra lỗi khi thêm bài viết:", error);
  });


