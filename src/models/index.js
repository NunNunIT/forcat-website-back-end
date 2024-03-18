// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define Admin Schema
// const adminSchema = new Schema({
//   login_name: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   name: { type: String, required: true },
//   sex: { type: String, enum: ['Nam', 'Nữ'], required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   address: { type: String, default: null },
//   is_active: { type: Boolean, default: true },
// });

// // Define Category Schema
// const categorySchema = new Schema({
//   name: { type: String, required: true },
//   img_url: { type: String, required: true },
//   type: { type: String, require: true },
//   added_date: { type: Date, default: Date.now },
//   is_display: { type: Number, default: 1 }
// });

// // Define Product Schema
// const productSchema = new Schema({
//   category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
//   name: { type: String, required: true },
//   img: { type: String, required: true },
//   price: { type: Number, required: true },
//   description: { type: String, default: null },
//   rating: { type: Number, min: 1, max: 5, default: 5 },
//   is_display: { type: Number, default: 1 },
// });

// // Define Product Variant Schema
// const productVariantSchema = new Schema({
//   product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
//   name: { type: String, required: true },
//   color: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, required: true },
//   is_display: { type: Boolean, default: true },
//   is_top: { type: Boolean, default: false },
//   is_active: { type: Boolean, default: true },
//   added_date: { type: Date, default: Date.now },
// });

// // Define Cart Schema
// const cartSchema = new Schema({
//   product_variant_id: { type: Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
//   quantity: { type: Number, required: true },
//   added_date: { type: Date, default: Date.now }
// });

// // Define Customer Schema
// const customerSchema = new Schema({
//   phone: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   name: { type: String },
//   birth: { type: Date },
//   sex: { type: String, enum: ['Nam', 'Nữ'] },
//   email: { type: String },
//   address: { type: String },
//   is_active: { type: Boolean, default: true },
//   cart: [cartSchema],
// });

// // Define Order Detail Schema
// const orderDetailSchema = new Schema({
//   product_variant_id: { type: Schema.Types.ObjectId, ref: 'ProductVariant', required: true },
//   order_detail_quantity: { type: Number, required: true },
//   order_detail_price: { type: Number, required: true }
// });

// // Define Order Schema
// const orderSchema = new Schema({
//   customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
//   staff_id: { type: Schema.Types.ObjectId, ref: 'Staff', required: true },
//   paying_method_id: { type: Schema.Types.ObjectId, ref: 'PayingMethod', default: 1 },
//   name: { type: String, required: true },
//   phone: { type: String, required: true },
//   date: { type: Date, default: Date.now },
//   delivery_date: { type: Date, required: true },
//   delivery_address: { type: String, required: true },
//   note: { type: String, required: true },
//   total_before: { type: Number, required: true },
//   total_after: { type: Number, required: true },
//   paying_date: { type: Date, required: true },
//   is_paid: { type: Boolean, required: false },
//   status: { type: String, enum: ['Chờ xác nhận', 'Đã xác nhận', 'Đang giao', 'Đã giao', 'Đã hủy'], required: true },
//   is_display: { type: Number, default: 1 },
//   details: [orderDetailSchema]
// });

// // Define Paying Method Schema
// const payingMethodSchema = new Schema({
//   paying_method_name: { type: String, required: true }
// });

// // Define Staff Schema
// const staffSchema = new Schema({
//   user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   login_name: { type: String, required: true },
//   password: { type: String, required: true },
//   full_name: { type: String, required: true },
//   birth: { type: Date, required: true },
//   sex: { type: String, enum: ['Nam', 'Nữ'], required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   address: { type: String, default: null },
//   role: { type: String, required: true },
//   is_active: { type: Boolean, default: true }
// });

// // Create models based on the schemas
// const AdminModel = mongoose.model('Admin', adminSchema);
// const CustomerModel = mongoose.model('Customer', customerSchema);
// const CartModel = mongoose.model('Cart', cartSchema);
// const CategoryModel = mongoose.model('Category', categorySchema);
// const OrderModel = mongoose.model('Order', orderSchema);
// const PayingMethodModel = mongoose.model('PayingMethod', payingMethodSchema);
// const ProductModel = mongoose.model('Product', productSchema);
// const ProductVariantModel = mongoose.model('ProductVariant', productVariantSchema);
// const StaffModel = mongoose.model('Staff', staffSchema);

// // Export the models
// module.exports = {
//   AdminModel,
//   CartModel,
//   CategoryModel,
//   CustomerModel,
//   OrderModel,
//   PayingMethodModel,
//   ProductModel,
//   ProductVariantModel,
//   StaffModel,
// };
