import Product from "../models/product.model.js"; // Import model sản phẩm
import responseHandler from "../handlers/response.handler.js";
import { decryptData } from "../utils/security.js";

// [GET] /api/product/:pid
export const getProduct = async (req, res, next) => {
  const encryptedProductId = req.params.pid;
  const productId = decryptData(encryptedProductId);

  try {
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return responseHandler.notFound(res, "Product Not Found");
    }

    return responseHandler.ok(res, { product });
  } catch (err) {
    console.log(err);
    return responseHandler.error(res);
  }
};

// [GET] /api/product/getRecommend/:product_id
export const getRecommend = async (req, res, next) => {
  const productId = req.params.product_id;

  try {
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
