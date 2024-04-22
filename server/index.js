import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import productListRoutes from "./routes/productList.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import notiRoutes from "./routes/noti.route.js";
import reviewRoutes from "./routes/review.route.js";
import orderRoutes from "./routes/order.route.js";
import articleRoutes from "./routes/article.route.js";
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

// app.use(cors());
// app.use(
//   cors({
//     origin: "https://www.forcatshop.com", // replace with the URL of your frontend
//     credentials: true,
//   })
// );
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

app.use(function (req, res, next) {
  const allowedOrigins = ['https://www.forcatshop.com', 'http://localhost:3000', 'https://forcat-website-front-end.vercel.app/']; // Replace with your second origin
  const origin = req.header('Origin');

  if (allowedOrigins.indexOf(origin) !== -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    // Rest of your code...
  }
  next();
});

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'https://www.forcatshop.com');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/productList", productListRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/notifications", notiRoutes);
app.use("/api/notifications", notiRoutes);
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
