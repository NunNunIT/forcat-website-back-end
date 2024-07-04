import mappingOrderStatus from "../../utils/mappingOrderStatus.js";
import convertOrderStatusToStr from "../../utils/convertOrderStatusToStr.js";
import { encryptData } from "../../utils/security.js";
import responseHandler from "../../handlers/response.handler.js";
import Order from "../../models/order.model.js";
import Notification from "../../models/notification.model.js";

// export const getOrdersOverview = async (req, res, next) => {
//   const order_status = req.query.order_status ?? null;

//   try {
//     const totalOrders = await Order.find({
//       order_status,
//     }).countDocuments();

//     return responseHandler.ok(res, totalOrders);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// }

const handleCustomer = (customer) => {
  const user_id_hashed = encryptData(customer._id);

  return {
    user_id: user_id_hashed,
    user_name: customer.user_name,
    user_phone: customer.user_phone,
    user_email: customer.user_email,
    user_address: customer.user_address,
    user_avt_img: customer.user_avt_img,
  };
};

const handleOrderInfo = (order) => ({
  order_id: order._id,
  order_buyer_name: order.order_buyer?.order_name,
  order_buyer_phone: order.order_buyer?.order_phone,
  order_address: order.order_address,
  order_status: order.order_status,
  order_payment: order.order_payment,
  order_total_cost: order.order_total_cost,
  createdAt: order.createdAt,
});

const handleOrderProcessInfo = (order_process_info) => {
  return order_process_info?.map(process => ({
    status: process.status,
    date: process.date,
  }))
}

const handleOrderDetail = (order) => {
  return order._doc.order_details.map(
    detail => {
      // get variant from product_variants
      const variant = detail.product_id?.product_variants.find(
        variant => variant.toObject()._id.toString() === detail.variant_id
      );

      return {
        product_id_hashed: encryptData(detail.product_id?._id),
        product_name: detail.product_id?.product_name,
        product_slug: detail.product_id?.product_slug,
        variant_id: detail.variant_id,
        variant_name: variant?.variant_name,
        product_img: variant?.variant_imgs[0],
        quantity: detail.quantity,
        unit_price: detail.unit_price,
      }
    }
  )
};

// [GET] /api/admin/orders/
export const getOrders = async (req, res, next) => {
  const sortedFields = { createdAt: -1 }
  const query = {};

  try {
    const orders = await Order.find(
      query, {
      order_details: 0,
    }).sort(sortedFields);

    if (!orders)
      return responseHandler.notFound(res, "Orders Not Found");

    const handledOrder = orders.map(handleOrderInfo);

    return responseHandler.ok(res, { maxPage: 1, orders: handledOrder });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

// [GET] /api/orders/order_id
export const getOrder = async (req, res, next) => {
  const orderId = req.params.order_id;
  try {
    const order = await Order.findOne({
      _id: orderId,
    }).populate(
      "customer_id",
      "_id user_name user_phone user_email user_address user_avt_img"
    ).populate(
      "order_details.product_id",
      "_id product_name product_slug product_variants"
    ).exec();

    if (!order)
      return responseHandler.notFound(res, "Order Not Found");

    const handledOrder = {
      customer: handleCustomer(order.customer_id),
      order: {
        ...handleOrderInfo(order),
        order_process_info: handleOrderProcessInfo(order.order_process_info),
        order_details: handleOrderDetail(order),
        order_note: order.order_note,
      }
    };

    return responseHandler.ok(res, handledOrder);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

// [POST] /api/orders/
export const updateOrderStatus = async (req, res, next) => {
  const { order_id, order_status } = req.body;

  // handle the invalid order_status
  if (!["delivering", "finished", "cancel"].includes(order_status))
    return responseHandler.badRequest(res, "Invalid status!");

  const query = {
    _id: order_id,
  }

  try {
    const order = await Order.findOne(query);

    if (!order)
      return responseHandler.notFound(res, "Order not found or That order does not belong to you!");
    if (order.order_status === order_status)
      return responseHandler.badRequest(res, "Order status is already " + order_status);
    if (!mappingOrderStatus(order.order_status, order_status))
      return responseHandler.badRequest(res, "Order status can't set cause the current status");

    // Update order_status, order_process_info
    await Order.findOneAndUpdate(query, {
      $set: { order_status },
      $push: { order_process_info: { status: order_status, date: new Date() } }
    }).exec();

    // Create notification
    const notiOrder = {
      notification_name: "Thông báo cập nhật đơn hàng",
      notification_type: "order",
      notification_description: `
        <p>Đơn hàng<b>${order_id}</b > của bạn đã được cập nhật tình trạng thành: ${convertOrderStatusToStr(order_status)}</ >
      `,
      users: {
        usersList: [
          { _id: updatedOrder.customer_id },
        ],
      },
    };

    await Notification.create(notiOrder);
    return responseHandler.ok(res, null, "Updated");
  } catch (err) {
    console.error(err);
    next(err);
  }
}