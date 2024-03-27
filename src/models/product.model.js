const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Product Schema
const productSchema = new Schema({
    product_id: { type: String, required: true },
    product_name: { type: String, required: true },
    product_slug: { type: String, required: true },
    categories: [{ category: { type: String } }],
    product_imgs: [{ link: { type: String }, alt: { type: String } }],
    product_avg_rating: { type: Number, min: 1, max: 5, },
    product_short_description: { type: String },
    product_description: [
        {
            type: { type: String, required: true },
            content: { type: String },
            url: { type: String },
            alt: { type: String },
        },
    ],
    product_detail: {
        title: { type: String },
        content: { type: String }
    },
    product_variants: [
        {
            variant_name: { type: String },
            price: { type: Number },
            // check
            variant_ims: { type: [String] },
            discount_id: { type: String },
            discount_amount: { type: Number },
            is_available: { type: Boolean },
            in_stock: { type: Number }
        }
    ],
    recent_reviews: [{
        review_id: { type: String },
        review_context: { type: String },
        review_rating: { type: Number },
        user_name: { type: String },
        user_avt: { type: String },
        review_date: { type: Date },
        // check
        review_imgs: { type: String },
        review_video: { type: String }

    }],
    product_supp_price: { type: Number }
});

const ProductModel = mongoose.model("Products", productSchema);

module.exports = { productSchema, ProductModel }