import Product from "../models/product.model.js";
import { encryptData } from "../utils/security.js";
import responseHandler from "../handlers/response.handler.js";
import { decryptData } from "../utils/security.js";

// [GET] /api/product/:pid
export const getProduct = async (req, res, next) => {
  try {
    const encryptedProductId = req.params.pid;
    const productId = decryptData(encryptedProductId);
    const product = await Product.findOne({
      _id: productId,
    }).populate({
      path: "recent_reviews",
      select:
        "_id product_variant_name review_rating user_info review_imgs review_video review_context createdAt",
    });

    if (!product) {
      return responseHandler.notFound(res, "Product Not Found");
    }

    return responseHandler.ok(res, {
      product: {
        _id: product._id,
        product_id_hashed: encryptData(product._id),
        product_name: product.product_name,
        product_slug: product.product_slug,
        category_names: product.category_names,
        categories: product.categories,
        product_imgs: product.product_imgs,
        product_avg_rating: product.product_avg_rating,
        product_imgs: product.product_imgs,
        product_sold_quanity: product.product_sold_quanity,
        product_short_description: product.product_short_description,
        product_description: product.product_description,
        product_detail: product.product_detail,
        product_variants: product.product_variants,
        review_count: product.review_count,
        recent_reviews: product.recent_reviews,
        product_supp_price: product.recent_reviews,
        recent_images: product.recent_reviews,
        recent_videos: product.recent_reviews,
        createdAt: product.recent_reviews,
        updatedAt: product.recent_reviews,
      },
    });
  } catch (err) {
    console.error(err);
    return responseHandler.error(res);
  }
};

// [GET] /api/product/getRecommend/:pid
export const getRecommend = async (req, res, next) => {
  try {
    const encryptedProductId = req.params.pid;
    const productId = decryptData(encryptedProductId);
    const product = await Product.findOne({
      _id: productId,
    });

    if (!product) {
      return responseHandler.notFound(res, "Recommend Not Found");
    }

    const productCategory = product.categories[0];
    const relatedProducts = await Product.find({
      categories: {
        $in: productCategory,
      },
      product_id: {
        $ne: productId,
      },
    });

    const transformedProducts = relatedProducts.map((product) => {
      // Tìm giá thấp nhất và số lượng bán được cao nhất
      const lowestPriceVariant = product.product_variants.reduce(
        (minPriceVariant, variant) => {
          if (
            !minPriceVariant ||
            (variant.price * (100 - variant.discount_amount)) / 100 <
            (minPriceVariant.price *
              (100 - minPriceVariant.discount_amount)) /
            100
          ) {
            minPriceVariant = variant;
          }
          return minPriceVariant;
        },
        null
      );

      const highestDiscountVariant = product.product_variants.reduce(
        (maxDiscountVariant, variant) => {
          if (
            !maxDiscountVariant ||
            variant.discount_amount > maxDiscountVariant.discount_amount
          ) {
            maxDiscountVariant = variant;
          }
          return maxDiscountVariant;
        },
        null
      );

      // Biến đổi dữ liệu sản phẩm theo yêu cầu
      return {
        product_id_hashed: encryptData(product._id),
        product_name: product.product_name,
        product_slug: product.product_slug,
        product_avg_rating: product.product_avg_rating,
        product_img: product.product_imgs[0], // Lấy ảnh đầu tiên trong mảng product_imgs
        lowest_price: lowestPriceVariant
          ? (lowestPriceVariant.price *
            (100 - lowestPriceVariant.discount_amount)) /
          100
          : null, // Giá thấp nhất
        product_price: lowestPriceVariant.price,
        highest_discount: highestDiscountVariant
          ? highestDiscountVariant.discount_amount
          : null, // Giảm giá cao nhất
        product_sold_quantity: product.product_sold_quanity, // Số lượng bán được
        category_name: product.category_names[0],
        variant_id: lowestPriceVariant._id,
        variant_name: lowestPriceVariant.variant_name,
        variant_slug: lowestPriceVariant.variant_slug,
      };
    });

    responseHandler.ok(res, transformedProducts, "Trả dữ liệu thành công");
  } catch (err) {
    console.error(err);
    return responseHandler.error(res);
  }
};
