import Product from "../models/product.model.js" // Import model sản phẩm

// Hàm tính độ phù hợp của một sản phẩm dựa trên từ khóa tìm kiếm
const calculateRelevance = (product, searchKey) => {
  let relevance = 0;
  const keywords = searchKey.split(/[\s,+]+/);
  console.log(keywords)

  // Kiểm tra sản phẩm và từ khóa không null hoặc undefined
  if (!product || !keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return relevance;
  }

  // Kiểm tra tần suất xuất hiện của từ khóa trong các trường dữ liệu quan trọng
  keywords.forEach(keyword => {
      if (product.product_name && product.product_name.toLowerCase().includes(keyword.toLowerCase())) {
          relevance += 3; // Tăng điểm nếu từ khóa xuất hiện trong tên sản phẩm
      }
      if (product.product_description && product.product_description.toLowerCase().includes(keyword.toLowerCase())) {
          relevance += 2; // Tăng điểm nếu từ khóa xuất hiện trong mô tả sản phẩm
      }
      if (product.category_names) {
        product.category_names.forEach(category => {
            if (category && category.toLowerCase().includes(keyword.toLowerCase())) {
                relevance += 1; // Tăng điểm nếu từ khóa xuất hiện trong tên biến thể sản phẩm
            }
        });
    }
      
      if (product.product_variants) {
          product.product_variants.forEach(variant => {
              if (variant.variant_name && variant.variant_name.toLowerCase().includes(keyword.toLowerCase())) {
                  relevance += 1; // Tăng điểm nếu từ khóa xuất hiện trong tên biến thể sản phẩm
              }
          });
      }
  });
  // console.log(product.product_name, keywords, relevance)
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



export const searchProductList = async (req, res, next) => {
  try {
    const searchKey = req.query.searchkey; // Lấy từ truy vấn tìm kiếm từ query parameter
    const products = await Product.find({
      $or: [
        { product_name: { $regex: searchKey, $options: 'i' } }, // Tìm kiếm theo tên sản phẩm, không phân biệt chữ hoa chữ thường
        { product_description: { $regex: searchKey, $options: 'i' } } // Tìm kiếm theo mô tả sản phẩm, không phân biệt chữ hoa chữ thường
      ]
    }, {
      product_name: 1,
      category_names: 1,
      product_imgs: 1,
      product_avg_rating: 1,
      product_variants: 1,
      product_sold_quanity: 1
    });

    res.status(200).json({ success: true, products: products });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi tìm kiếm sản phẩm.' });
  }
};

export const getNewestProducts = async (req, res, next) => {
  try {
    const newestProducts = await Product.find()
      .sort({ createdAt: -1 }) // Sắp xếp các sản phẩm theo thời gian tạo giảm dần (tức là mới nhất đầu tiên)
      .limit(10); // Giới hạn kết quả trả về chỉ 10 sản phẩm

    res.status(200).json({ success: true, products: newestProducts });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi lấy sản phẩm mới nhất.' });
  }
};


export const getTopRatedProducts = async (req, res, next) => {
  try {
    const topRatedProducts = await Product.find()
      .sort({ product_avg_rating: -1 }) // Sắp xếp các sản phẩm theo product_avg_rating giảm dần
      .limit(10) // Giới hạn kết quả trả về chỉ 10 sản phẩm
      .select('product_name category_names product_imgs product_avg_rating product_variants product_sold_quanity'); // Chọn các trường cần trả về

    res.status(200).json({ success: true, products: topRatedProducts });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi lấy sản phẩm có đánh giá cao nhất.' });
  }
};

// Controller để tìm những sản phẩm phù hợp với searchKey
export const getSearchRecommended = async (req, res) => {
  try {
    let searchKey = req.query.searchKey; // Lấy từ truy vấn tìm kiếm từ query parameter
    let searchConditions = {};

    if (searchKey) {
      searchKey = searchKey.replace(/\s+/g, '(^\\s.+)|');
      // let searchKeySlug = removeAccents(searchKey)
      let searchKeySlug = searchKey.replace(/\s+/g, '-');
      console.log(searchKey, searchKeySlug);
      // Sử dụng regular expression để tìm kiếm các từ tương tự
      searchConditions.$or = [
        { product_name: { $regex: searchKey, $options: 'i' } }, // Tìm kiếm tương tự trong tên sản phẩm
        { product_slug: { $regex: searchKeySlug, $options: 'i' } }, // Tìm kiếm tương tự trong tên sản phẩm
        { category_names: { $regex: searchKey, $options: 'i' } }, // Kiểm tra xem danh sách category_names có chứa searchKey không
        { product_description: { $regex: searchKey, $options: 'i' } },
        { 'product_variants.variant_name': { $regex: searchKey, $options: 'i' } }
      ];
    }

    let products = await Product.find(searchConditions)
      .select('product_name product_description category_names product_imgs product_variants') // Chọn các trường cần trả về

    // Sắp xếp kết quả tìm kiếm theo độ phù hợp
    products = sortSearchResults(products, req.query.searchKey);

    // Lấy 10 kết quả đầu tiên
    const firstTenProducts = products.slice(0, 10);

    res.status(200).json({ success: true, products: firstTenProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi tìm kiếm sản phẩm.' });
  }
};

// Controller tìm kiếm + bộ lọc kết quả tìm kiếm
export const search = async (req, res) => {
  try {
    let { searchKey, category, rating, minPrice, maxPrice, sortBy, page } = req.query;
    const perPage = 20;
    const pageNumber = parseInt(page) || 1;

    let searchConditions = {};

    if (searchKey) {
      searchKey = searchKey.replace(/\s+/g, '(^\\s.+)|');
      let searchKeySlug = searchKey.replace(/\s+/g, '-');
      // console.log(searchKey, category)
      // Sử dụng regular expression để tìm kiếm các từ tương tự
      searchConditions.$or = [
        { product_name: { $regex: searchKey, $options: 'i' } }, // Tìm kiếm tương tự trong tên sản phẩm
        { product_slug: { $regex: searchKeySlug, $options: 'i' } }, // Tìm kiếm tương tự trong tên sản phẩm
        { category_names: { $regex: searchKey, $options: 'i' } }, // Kiểm tra xem danh sách category_names có chứa searchKey không
        { product_description: { $regex: searchKey, $options: 'i' } },
        { 'product_variants.variant_name': { $regex: searchKey, $options: 'i' } }
      ];
    }
    if (category) {
      category = category.replace(/\s+/g, '(^\\s.+)|');
      searchConditions.category_names = { $regex: category, $options: 'i' };
    }
    if (rating) {
      const minRating = parseFloat(rating) - 0.2;
      const maxRating = parseFloat(rating) + 0.99;
      searchConditions.product_avg_rating = { $gte: minRating, $lt: maxRating };
    }
    if (minPrice && maxPrice) {
      searchConditions['product_variants.price'] = { $gte: minPrice, $lte: maxPrice };
    }

    let sortOptions = {};
    if (sortBy === 'popular') {
      sortOptions.product_sold_quanity = -1;
    } else if (sortBy === 'high_to_low') {
      sortOptions['product_variants.price'] = -1;
    } else if (sortBy === 'low_to_high') {
      sortOptions['product_variants.price'] = 1;
    }

    const totalProducts = await Product.countDocuments(searchConditions);
    const totalPages = Math.ceil(totalProducts / perPage);
    const skip = (pageNumber - 1) * perPage;

    let products = await Product.find(searchConditions)
      .sort(sortOptions)
      .skip(skip)
      .limit(perPage)
      .select('product_name product_description category_names product_imgs product_avg_rating product_variants product_sold_quanity') // Chọn các trường cần trả về

    products = sortSearchResults(products, req.query.searchKey);
    res.json({  totalPages, currentPage: pageNumber, totalResults: totalProducts, products });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi tìm kiếm sản phẩm.' });
  }
};