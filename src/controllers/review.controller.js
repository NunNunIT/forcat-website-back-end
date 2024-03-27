const { ReviewModel } = require("../models");

const reviewController = () => { };

reviewController.getOverview = async (req, res, next) => {
    const productId = req.params.product_id;

    try {
        const reviews = await ReviewModel.find({ product_id: productId });

        if (!reviews) {
            return res.status(404).json({
                statusCode: 404,
                message: "Product not found",
            });
        }

        // Khởi tạo mảng đếm cho các khoảng điểm số
        const counts = [0, 0, 0, 0, 0];

        // Lặp qua mỗi review và tăng giá trị của phần tử tương ứng trong mảng đếm
        reviews.forEach(review => {
            const rating = review.reviews_rating;
            const index = Math.ceil(rating);
            counts[index]++;
        });

        const totalReviews = reviews.length;

        return res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: {
                totalReviews, reviewByStar: {
                    "5": counts[4],
                    "4": counts[3],
                    "3": counts[2],
                    "2": counts[1],
                    "1": counts[0],
                }
            }
        });
    }
    catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
};

module.exports = reviewController;
