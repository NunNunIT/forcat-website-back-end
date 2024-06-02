import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import Review from "../models/review.model.js";
import responseHandler from "../handlers/response.handler.js";
import { decryptData } from "../utils/security.js";

// [POST] /api/reviews/
export const createOrUpdate = async (req, res, next) => {
  const user_id = req.user?.id ?? req.query?.id ?? "661754a9ae209b64b08e6874";
  if (!user_id)
    return responseHandler.unauthorize(res, "You are not authenticated!");

  const role = req.user?.role ?? "user";
  // Only user can create or update review
  if (!role || !["user"].includes(role))
    return responseHandler.forbidden(res, "You are not authorized!");

  const {
    product_id_hashed, product_variant_name,
    order_id, user_info, review_rating,
    review_context
  } = req.body;
  if (!product_id_hashed || !order_id || !user_info || !review_rating || !review_context)
    return responseHandler.badRequest(res, "Missing required fields!");

  try {
    const product_id = decryptData(product_id_hashed);
    const product = await Product.findById(product_id, "product_name");
    // Handle if product not exists by product_id
    if (!product)
      return responseHandler.badRequest(res, "Product not found!");

    // query order
    const query_order = { _id: order_id, customer_id: user_id, order_status: "finished" };
    const order = await Order.findOne(query_order, "_id");
    // Handle if order not exists by order_id, customer_id, or order_status is not finished
    if (!order)
      return responseHandler.badRequest(res, "Order not found or That order is not belong to you so can't create the review!");

    // query review
    const query_review = { user_id, product_id, order_id }
    const review = await Review.findOne(query_review);
    // Handle if review not exists to create new review
    if (!review) {
      await Review.create({
        product_id,
        product_variant_name,
        user_id,
        order_id,
        user_info,
        review_rating,
        review_context,
        review_imgs: [],
        review_videos: [],
      });

      return responseHandler.created(res, null, "Review created successfully!");
    }

    // Handle to update review
    await Review.findOneAndUpdate(query_review, {
      review_rating,
      review_context,
    });

    return responseHandler.ok(res, null, "Review updated successfully!");
  } catch (err) {
    next(err);
  }
}

// [GET] /api/reviews/getOverview/:product_id
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
    console.error(err);
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