import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import path from 'path';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import productListRoutes from './routes/productList.route.js';
import articleRoutes from './routes/article.route.js';
import purchaseRoutes from './routes/purchase.route.js';

const PORT = 8080;
const __dirname = path.resolve()

dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/productList', productListRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/purchases', purchaseRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    statusCode,
    success: false,
    message,
  });
})
