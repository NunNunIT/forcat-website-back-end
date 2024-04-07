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
