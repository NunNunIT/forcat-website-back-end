import mongoose from "mongoose";
import Order from "../models/order.model.js";
import Notification from "../models/notification.model.js";
import responseHandler from "../handlers/response.handler.js";
import { createSlug } from "../utils/createSlug.js";

// [POST] /api/order/addOrder
export const addOrder = async (req, res, next) => {
  const orderInfo = req.body;

  try {
    const newOrder = {
      customer_id: new mongoose.Types.ObjectId(orderInfo.customer_id),
      staff_id: "null",
      payment_id: "null",
      order_buyer: orderInfo.order_buyer,
      order_adress: orderInfo.order_adress,
      order_note: orderInfo.order_note,
      order_shipping_cost: orderInfo.order_shipping_cost,
      order_total_cost: orderInfo.order_total_cost,
      order_details: orderInfo.order_details.map((orderDetail) => ({
        product_id: new mongoose.Types.ObjectId(orderDetail.product_id),
        variant_id: orderDetail.variant_id,
        quantity: orderDetail.quantity,
        unit_price: orderDetail.unit_price,
      })),
    };

    await Order.create(newOrder);

    const newNotification = {
      notification_name: "Thông báo đặt hàng thàn công",
      notification_slug: createSlug("Thông báo đặt hàng thành công"),
      notification_type: "testabs",
      notification_description: [{ type: "title", content: "testabc" }],
      users: {
        usersList: [
          { user: new mongoose.Types.ObjectId(orderInfo.customer_id) },
        ],
      },
    };

    await Notification.create(newNotification);

    return responseHandler.created(res, {});
  } catch (err) {
    console.log(err);
    return responseHandler.error(res);
  }
};
