import Product from "../models/product.model.js";
import Review from "../models/review.model.js";
import responseHandler from "../handlers/response.handler.js";
import { decryptData } from "../utils/security.js";

// [GET] /api/product/:pid
export const getProduct = async (req, res, next) => {
  try {
    const encryptedProductId = req.params.pid;
    const productId = decryptData(encryptedProductId);
    const product = await Product.findOne({ _id: productId }).populate({
      path: "recent_reviews",
      select:
        "_id product_variant_name review_rating user_info review_imgs review_video review_context createdAt",
    });

    if (!product) {
      return responseHandler.notFound(res, "Product Not Found");
    }

    return responseHandler.ok(res, { product });
  } catch (err) {
    console.log(err);
    return responseHandler.error(res);
  }
};

// [GET] /api/product/getRecommend/:pid
export const getRecommend = async (req, res, next) => {
  try {
    const encryptedProductId = req.params.pid;
    const productId = decryptData(encryptedProductId);
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return responseHandler.notFound(res, "Recommend Not Found");
    }

    const productCategory = product.categories[0].category;
    const relatedProducts = await Product.find({
      categories: { $elemMatch: { category: productCategory } },
      product_id: { $ne: productId },
    });
    return responseHandler.ok(res, { relatedProducts });
  } catch (err) {
    console.log(err);
    return responseHandler.error(res);
  }
};
