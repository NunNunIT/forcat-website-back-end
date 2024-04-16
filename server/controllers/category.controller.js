import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import responseHandler from "../handlers/response.handler.js";
import { encryptData } from "../utils/security.js";

export const getCategoriesList = async (req, res, next) => {
  try {
    // Fetch all categories
    const categories = await Category.find({}, "category_name category_type category_img");

    // Group categories by category_type
    const categoriesByType = [];
    for (const category of categories) {
      const type = category.category_type;
      if (!categoriesByType.find((cat) => cat.category_type === type)) {
        categoriesByType.push({
          category_type: type,
          subCategories: [],
        });
      }
      categoriesByType.find((cat) => cat.category_type === type).subCategories.push({
        ...category.toObject(),
        products: [],
        productCount: 0, // Added: property for product count
      });
    }

    // Group products by category_id within each category type
    for (const category of categoriesByType) {
      const categoryIds = category.subCategories.map((subCategory) => subCategory._id);
      const products = await Product.find({
        categories: { $in: categoryIds },
      });

      for (const subCategory of category.subCategories) {
        const subCategoryId = subCategory._id;
        const subCategoryProducts = products.filter((product) =>
          product.categories.includes(subCategoryId)
        );

        const transformedProducts = subCategoryProducts.map((product) => {
          // Tìm giá thấp nhất và tính toán giá sau khi giảm giá
          const lowestPriceVariant = product.product_variants.reduce(
            (minPriceVariant, variant) => {
              const discountedPrice =
                (variant.price * (100 - variant.discount_amount)) / 100;
              if (
                !minPriceVariant ||
                discountedPrice < minPriceVariant.discountedPrice
              ) {
                minPriceVariant = {
                  price: discountedPrice,
                  discountedPrice: variant.price,
                };
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
            product_sold_quantity: product.product_sold_quantity, // Số lượng bán được
            category_name: product.category_names[0],
          };
        });

        subCategory.products = transformedProducts;
        subCategory.productCount = subCategoryProducts.length; // Update product count
      }
    }

    responseHandler.ok(res, categoriesByType, "Trả dữ liệu thành công");
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({
        success: false,
        message: "Đã xảy ra lỗi khi lấy danh mục sản phẩm.",
      });
  }
};
