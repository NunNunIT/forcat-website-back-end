import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import productListRoutes from "./routes/productList.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import notiRoutes from "./routes/noti.route.js";
import reviewRoutes from "./routes/review.route.js";
import orderRoutes from "./routes/order.route.js";
import articleRoutes from "./routes/article.route.js";
import categoryRoutes from "./routes/category.route.js";
import paymentRoutes from "./routes/payment.route.js";

const PORT = 8080;
const __dirname = path.resolve();

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  const allowedOrigins = [
    "https://www.forcatshop.com",
    "http://localhost:3000",
    /^https:\/\/forcat-website-front-.*\.vercel\.app$/,
  ];
  const origin = req.headers.origin ?? req.header("Origin"); // Sử dụng req.headers.origin thay vì req.header('Origin')
  // console.log(req.headers);
  // console.log("Origin", origin);
  if (allowedOrigins.some((allowedOrigin) => origin && origin.match(allowedOrigin))) {
    // console.log("Origin allowed with", origin);
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  if (req.method === "OPTIONS") {
    res.sendStatus(200); // Đáp ứng yêu cầu OPTIONS với mã trạng thái 200
  } else {
    next(); // Chuyển tiếp yêu cầu đến middleware tiếp theo
  }
});

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/productList", productListRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/notifications", notiRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/payment", paymentRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
  });
});
