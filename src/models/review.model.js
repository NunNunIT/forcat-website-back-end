const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Review Schema
const reviewSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    review_id: {
        type: String,
        required: true,
        unique: true
    },
    product_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    order_id: {
        type: String,
        required: true
    },
    reviews_rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    reviews_context: {
        type: String,
        required: true
    },
    review_imgs: [{
        link: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            default: 'Ảnh review'
        }
    }],
    review_video: [{
        link: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            default: 'Video review'
        }
    }]
});

const ReviewModel = mongoose.model("Reviews", reviewSchema);

module.exports = { reviewSchema, ReviewModel }