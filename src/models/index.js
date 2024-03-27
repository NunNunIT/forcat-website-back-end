const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// import models
const { ProductModel } = require("./product.model")
const { CategoryModel } = require("./category.model")
const { ReviewModel } = require("./review.model")

const articleSchema = new Schema({
  article_id: { type: String, required: true, unique: true, },
  article_name: { type: String, required: true, },
  article_type: { type: String, required: true, },
  article_short_description: { type: String, required: true, },
  article_info: {
    type: {
      author: { type: String, required: true, },
      published_date: { type: Date, default: Date(), },
    },
    required: true,
  },
  article_description: {
    type: [
      {
        type: { type: String, required: true, },
        content: { type: String, required: true, },
      },
      {
        type: { type: String, required: true, },
        url: { type: String, required: true, },
        alt: { type: String, required: true, },
        caption: { type: String, required: true, },
      }
    ],
    required: true,
  },
  article_date: { type: Date, default: Date(), },
  article_slug: { type: String, required: true, unique: true, },
})

const ArticleModel = mongoose.model('Article', articleSchema);

module.exports = {
  ArticleModel,
  ProductModel,
  CategoryModel,
  ReviewModel,
};
