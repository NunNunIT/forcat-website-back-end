import Review from "../models/review.model.js";
import responseHandler from "../handlers/response.handler.js";

// [GET] /api/review/getOverview/:product_id
export const getOverview = async (req, res, next) => {
  const productId = req.params.product_id;

  try {
    const reviews = await Review.find({ product_id: productId });

    if (!reviews) {
      return responseHandler.badrequest(res, "Review Not Found");
    }

    // Khởi tạo mảng đếm cho các khoảng điểm số
    const counts = [0, 0, 0, 0, 0];

    // Lặp qua mỗi review và tăng giá trị của phần tử tương ứng trong mảng đếm
    reviews.forEach((review) => {
      const rating = review.reviews_rating;
      const index = Math.ceil(rating);
      counts[index]++;
    });

    const totalReviews = reviews.length;

    return responseHandler.ok(res, {
      totalReviews,
      reviewByStar: {
        5: counts[4],
        4: counts[3],
        3: counts[2],
        2: counts[1],
        1: counts[0],
      },
    });
  } catch (err) {
    console.log(err);
    return responseHandler.error(res);
  }
};

// Controller để lấy các đánh giá của sản phẩm với bộ lọc, phân trang và sắp xếp tương ứng
export const getFilteredReviews = async (req, res) => {
  try {
    let { product_id, rating, sortBy, page } = req.query;
    page = parseInt(page) || 1;

    // Xây dựng query dựa trên bộ lọc
    let query = {};

    // Bộ lọc theo id sản phẩm
    if (product_id !== undefined) {
      query.product_id = product_id;
    }

    // Bộ lọc theo đánh giá sao
    if (rating !== undefined && rating >= 0 && rating <= 5) {
      query.review_rating = rating;
    }

    // Sắp xếp theo thời gian gần nhất
    let sortQuery = { createdAt: -1 }; // Sắp xếp theo thời gian giảm dần (tức là mới nhất đầu tiên)
    if (sortBy === 'oldest') {
      sortQuery = { createdAt: 1 }; // Sắp xếp theo thời gian tăng dần (tức là cũ nhất đầu tiên)
    }

    // Số lượng đánh giá trên mỗi trang
    const perPage = 10;
    const skip = (page - 1) * perPage;

    // Tính tổng số đánh giá
    const totalReviews = await Review.countDocuments(query);

    // Tính tổng số trang
    const totalPages = Math.ceil(totalReviews / perPage);

    // Lấy danh sách các đánh giá dựa trên query, sắp xếp và phân trang
    const reviews = await Review.find(query)
                                .select('user_info review_rating review_context review_imgs review_video createdAt')
                                .sort(sortQuery)
                                .skip(skip)
                                .limit(perPage);

    // Trả về kết quả
    res.status(200).json({
      reviews,
      currentPage: page,
      totalPages
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

