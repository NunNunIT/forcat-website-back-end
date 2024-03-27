const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Category Schema
const categorySchema = new Schema({
    category_id: { type: String, required: true },
    category_name: { type: String, required: true },
    category_slug: { type: String, required: true },
    category_img: { type: String, required: true },
    category_short_description: { type: String, required: true },
    // type: { type: String, require: true },
    // added_date: { type: Date, default: Date.now },
    // is_display: { type: Number, default: 1 }
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = { categorySchema, CategoryModel }