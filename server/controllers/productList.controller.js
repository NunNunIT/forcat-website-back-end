import Product from "../models/product.model.js"; // Import model sản phẩm
import responseHandler from "../handlers/response.handler.js";

// Hàm tính độ phù hợp của một sản phẩm dựa trên từ khóa tìm kiếm
const calculateRelevance = (product, searchKey) => {
  let relevance = 0;
  const keywords = searchKey.split(/[\s,+]+/);

  // Kiểm tra sản phẩm và từ khóa không null hoặc undefined
  if (
    !product ||
    !keywords ||
    !Array.isArray(keywords) ||
    keywords.length === 0
  ) {
    return relevance;
  }

  // Đối với mỗi từ khóa
  keywords.forEach((keyword) => {
    let keywordCount = 0; // Đếm số lần từ khóa xuất hiện trong các trường dữ liệu sản phẩm

    // Kiểm tra tần suất xuất hiện của từ khóa trong các trường dữ liệu quan trọng
    if (
      product.product_name &&
      product.product_name.toLowerCase().includes(keyword.toLowerCase())
    ) {
      relevance += 1; // Tăng điểm nếu từ khóa xuất hiện trong tên sản phẩm
      keywordCount += 1;
    }
    if (
      product.product_description &&
      product.product_description.toLowerCase().includes(keyword.toLowerCase())
    ) {
      relevance += 1; // Tăng điểm nếu từ khóa xuất hiện trong mô tả sản phẩm
      keywordCount += 1;
    }
    if (product.category_names) {
      product.category_names.forEach((category) => {
        if (
          category &&
          category.toLowerCase().includes(keyword.toLowerCase())
        ) {
          relevance += 1; // Tăng điểm nếu từ khóa xuất hiện trong tên biến thể sản phẩm
          keywordCount += 1;
        }
      });
    }
    if (product.product_variants) {
      product.product_variants.forEach((variant) => {
        if (
          variant.variant_name &&
          variant.variant_name.toLowerCase().includes(keyword.toLowerCase())
        ) {
          relevance += 1; // Tăng điểm nếu từ khóa xuất hiện trong tên biến thể sản phẩm
          keywordCount += 1;
        }
      });
    }

    // Nếu từ khóa xuất hiện ít nhất một lần trong các trường dữ liệu sản phẩm
    if (keywordCount > 0) {
      relevance += keywordCount * 2; // Tăng điểm dựa trên số lần xuất hiện của từ khóa (nhưng điểm cộng thấp hơn)
    }
  });

  // Kiểm tra cụm từ khóa xuất hiện trong dữ liệu sản phẩm
  const phraseCount = keywords.reduce((count, keyword) => {
    if (
      product.product_name.toLowerCase().includes(keyword.toLowerCase()) ||
      product.product_description.toLowerCase().includes(keyword.toLowerCase())
    ) {
      return count + 1;
    }
    if (product.category_names) {
      product.category_names.forEach((category) => {
        if (
          category &&
          category.toLowerCase().includes(keyword.toLowerCase())
        ) {
          count += 1;
        }
      });
    }
    if (product.product_variants) {
      product.product_variants.forEach((variant) => {
        if (
          variant.variant_name &&
          variant.variant_name.toLowerCase().includes(keyword.toLowerCase())
        ) {
          count += 1;
        }
      });
    }
    return count;
  }, 0);

  // Nếu có cụm từ giống với từ khóa, tăng điểm
  if (phraseCount > 0) {
    relevance += phraseCount * 6;
  }

  return relevance;
};

// Sắp xếp kết quả tìm kiếm theo độ phù hợp
const sortSearchResults = (products, searchKey) => {
  return products.sort((a, b) => {
    const relevanceA = calculateRelevance(a, searchKey);
    const relevanceB = calculateRelevance(b, searchKey);
    return relevanceB - relevanceA; // Sắp xếp giảm dần theo độ phù hợp
  });
};

export const getNewestProducts = async (req, res, next) => {
  try {
    const newestProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select(
        "product_name category_names product_imgs product_avg_rating product_variants product_sold_quanity product_slug"
      );

    const transformedProducts = newestProducts.map((product) => {
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
        product_id: product._id,
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
      };
    });

    responseHandler.ok(res, transformedProducts, "Trả dữ liệu thành công");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi lấy sản phẩm mới nhất.",
    });
  }
};

export const getTopRatedProducts = async (req, res, next) => {
  try {
    const topRatedProducts = await Product.find()
      .sort({ product_avg_rating: -1 }) // Sắp xếp các sản phẩm theo product_avg_rating giảm dần
      .limit(10) // Giới hạn kết quả trả về chỉ 10 sản phẩm
      .select(
        "product_name category_names product_imgs product_avg_rating product_variants product_sold_quanity product_slug"
      ); // Chọn các trường cần trả về

    const transformedProducts = topRatedProducts.map((product) => {
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
        product_id: product._id,
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
      };
    });

    responseHandler.ok(res, transformedProducts, "Trả dữ liệu thành công");
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi lấy sản phẩm có đánh giá cao nhất.",
    });
  }
};

export const getDiscountProducts = async (req, res, next) => {
  try {
    const discountProducts = await Product.find({
      product_variants: {
        $elemMatch: {
          discount_id: { $exists: true },
          discount_amount: { $gt: 0 },
        },
      },
    })
      .sort({ product_avg_rating: -1 })
      .limit(10)
      .select(
        "product_name category_names product_imgs product_avg_rating product_variants product_sold_quanity product_slug"
      );

    const transformedProducts = discountProducts.map((product) => {
      const lowestPriceVariant = product.product_variants.reduce(
        (minPriceVariant, variant) => {
          if (
            (!minPriceVariant ||
              (variant.price * (100 - variant.discount_amount)) / 100 <
                (minPriceVariant.price *
                  (100 - minPriceVariant.discount_amount)) /
                  100) &&
            variant.discount_id &&
            variant.discount_amount > 0
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
            (!maxDiscountVariant ||
              variant.discount_amount > maxDiscountVariant.discount_amount) &&
            variant.discount_id &&
            variant.discount_amount > 0
          ) {
            maxDiscountVariant = variant;
          }
          return maxDiscountVariant;
        },
        null
      );

      return {
        product_id: product._id,
        product_name: product.product_name,
        product_slug: product.product_slug,
        product_avg_rating: product.product_avg_rating,
        product_img: product.product_imgs[0],
        lowest_price: lowestPriceVariant
          ? (lowestPriceVariant.price *
              (100 - lowestPriceVariant.discount_amount)) /
            100
          : null,
        product_price: lowestPriceVariant ? lowestPriceVariant.price : null,
        highest_discount: highestDiscountVariant
          ? highestDiscountVariant.discount_amount
          : null,
        product_sold_quantity: product.product_sold_quanity,
        category_name: product.category_names[0],
        variant_name: lowestPriceVariant
          ? lowestPriceVariant.variant_name
          : null,
      };
    });

    responseHandler.ok(res, transformedProducts, "Trả dữ liệu thành công");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi lấy sản phẩm có đánh giá cao nhất.",
    });
  }
};

// Controller để tìm những sản phẩm phù hợp với searchKey
export const getSearchRecommended = async (req, res) => {
  try {
    let { searchKey } = req.query;
    let searchConditions = {};

    if (searchKey) {
      searchKey = searchKey.replace(/\s+/g, "(^\\s.+)|");
      let searchKeySlug = searchKey.replace(/\s+/g, "-");

      searchConditions.$or = [
        { product_name: { $regex: searchKey, $options: "i" } }, // Tìm kiếm tương tự trong tên sản phẩm
        { product_slug: { $regex: searchKeySlug, $options: "i" } }, // Tìm kiếm tương tự trong tên sản phẩm
        { category_names: { $regex: searchKey, $options: "i" } }, // Kiểm tra xem danh sách category_names có chứa searchKey không
        { product_description: { $regex: searchKey, $options: "i" } },
        {
          "product_variants.variant_name": { $regex: searchKey, $options: "i" },
        },
      ];
    }

    const totalProducts = await Product.countDocuments(searchConditions);

    let products = await Product.find(searchConditions)
      .sort({})
      .select(
        "product_name product_description category_names product_imgs product_avg_rating product_variants product_sold_quanity product_slug"
      ); // Chọn các trường cần trả về

    products = sortSearchResults(products, req.query.searchKey);
    // Lấy 10 kết quả đầu tiên
    const firstTenProducts = products.slice(0, 10);

    // Biến đổi dữ liệu trả về theo yêu cầu
    const transformedProducts = firstTenProducts.map((product) => {
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
              discountedPrice: discountedPrice,
              price: variant.price,
            };
          }
          return minPriceVariant;
        },
        null
      );

      return {
        product_id: product._id,
        product_name: product.product_name,
        product_slug: product.product_slug,
        product_img: product.product_imgs[0], // Lấy ảnh đầu tiên trong mảng product_imgs
        product_price: lowestPriceVariant.price, // Giá thấp nhất
        lowest_price: lowestPriceVariant.discountedPrice, // Giá gốc
      };
    });

    responseHandler.ok(
      res,
      {
        searchKey: req.query.searchKey,
        totalProducts,
        recommendedProducts: transformedProducts,
      },
      "Trả dữ liệu thành công"
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tìm kiếm sản phẩm.",
    });
  }
};

// Controller tìm kiếm + bộ lọc kết quả tìm kiếm
export const search = async (req, res) => {
  try {
    let { searchKey, category, rating, minPrice, maxPrice, sortBy, discount, page } =
      req.query;
    const perPage = 20;
    const pageNumber = parseInt(page) || 1;

    let searchConditions = {};

    if (searchKey) {
      searchKey = searchKey.replace(/\s+/g, "(^\\s.+)|");
      let searchKeySlug = searchKey.replace(/\s+/g, "-");
      // console.log(searchKey, category)
      // Sử dụng regular expression để tìm kiếm các từ tương tự

      searchConditions.$or = [
        { product_name: { $regex: searchKey, $options: "i" } }, // Tìm kiếm tương tự trong tên sản phẩm
        { product_slug: { $regex: searchKeySlug, $options: "i" } }, // Tìm kiếm tương tự trong tên sản phẩm
        { category_names: { $regex: searchKey, $options: "i" } }, // Kiểm tra xem danh sách category_names có chứa searchKey không
        { product_description: { $regex: searchKey, $options: "i" } },
        {
          "product_variants.variant_name": { $regex: searchKey, $options: "i" },
        },
      ];
    }
    if (category) {
      category = category.replace(/\s+/g, "(^\\s.+)|");
      searchConditions.category_names = { $regex: category, $options: "i" };
    }
    if (rating) {
      const minRating = parseFloat(rating) - 0.2;
      const maxRating = parseFloat(rating) + 0.99;
      searchConditions.product_avg_rating = { $gte: minRating, $lt: maxRating };
    }
    if (minPrice && maxPrice) {
      searchConditions["product_variants.price"] = {
        $gte: minPrice,
        $lte: maxPrice,
      };
    }

    if (discount) {
      searchConditions["product_variants"] = {
        $elemMatch: {
          discount_id: { $exists: true },
          discount_amount: { $gt: 0 },
        },
      };
    }

    let sortOptions = {};
    if (sortBy === "hot") {
      sortOptions.product_sold_quantity = -1; // Sắp xếp theo sản phẩm nổi bật
    } else if (sortBy === "sale") {
      sortOptions.product_sold_quantity = -1; // Sắp xếp theo sản phẩm bán chạy
    } else if (sortBy === "price-z-to-a") {
      sortOptions["product_variants.price"] = -1; // Sắp xếp theo giá cao đến thấp
    } else if (sortBy === "price-a-to-z") {
      sortOptions["product_variants.price"] = 1; // Sắp xếp theo giá thấp đến cao
    }

    const totalProducts = await Product.countDocuments(searchConditions);
    const totalPages = Math.ceil(totalProducts / perPage);
    const skip = (pageNumber - 1) * perPage;

    let products = await Product.find(searchConditions)
      .sort(sortOptions)
      .skip(skip)
      .limit(perPage)
      .select(
        "product_name product_description category_names product_imgs product_avg_rating product_variants product_sold_quanity product_slug"
      ); // Chọn các trường cần trả về

    products = sortSearchResults(products, req.query.searchKey);

    // Biến đổi dữ liệu trả về theo yêu cầu
    const transformedProducts = products.map((product) => {
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
        product_id: product._id,
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

    responseHandler.ok(
      res,
      {
        totalPages,
        currentPage: pageNumber,
        totalResults: totalProducts,
        searchProducts: transformedProducts,
      },
      "Trả dữ liệu thành công"
    );
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tìm kiếm sản phẩm.",
    });
  }
};
