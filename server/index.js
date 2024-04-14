import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import productListRoutes from './routes/productList.route.js';
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import reviewRoutes from "./routes/review.route.js";
import orderRoutes from "./routes/order.route.js";
import articleRoutes from "./routes/article.route.js";
import purchaseRoutes from "./routes/purchase.route.js";
import categoryRoutes from "./routes/category.route.js";

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

const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080'];

const corsOptions = {
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Allow sending of cookies
};

// app.use(cors()); // Khi nào cần sử dụng postman hoặc thunder client thì bật này lên, tắt cái dưwới
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use('/api/productList', productListRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/category", categoryRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
  });
});
