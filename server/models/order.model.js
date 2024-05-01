import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Tham chiếu đến collection người dùng (User)
    },
    staff_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: "661754e675fd4037c93d0dd8",
      ref: "User", // Tham chiếu đến collection nhân viên (Staff), nếu có
    },
    order_buyer: {
      order_name: String,
      order_phone: String,
    },
    order_address: {
      street: String,
      ward: String,
      district: String,
      province: String,
    },
    order_payment: {
      type: String,
      default: "cod",
      enum: ["cod", "momo", "internet_banking"],
    },
    orderCode: {
      type: Number,
      unique: true,
      // orderCode tham chiếu đến payOS,
      // dùng để xác định đơn hàng đã được thanh toán hay chưa
    },
    order_note: String,
    order_payment_cost: { type: Number, default: 0 },
    order_shipping_cost: { type: Number, default: 0 },
    order_total_cost: Number,
    order_process_info: [
      {
        status: String,
        date: Date,
      },
    ],
    order_status: { type: String, default: "unpaid" },
    order_details: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Tham chiếu đến collection sản phẩm (Product)
        },
        variant_id: {
          type: String,
        },
        quantity: Number,
        unit_price: Number,
      },
    ],
  },
  { timestamps: true }
);

orderSchema.pre("save", function (next) {
  this.order_process_info = [
    {
      status: "unpaid",
      date: new Date(),
    },
  ];

  this.order_total_cost = this.order_details.reduce(
    (total, item) => total + item.quantity * item.unit_price,
    this.order_shipping_cost
  );

  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
