import mappingOrderStatus from "../../utils/mappingOrderStatus.js";
import responseHandler from "../../handlers/response.handler";
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
//     console.log(err);
//     next(err);
//   }
// }

// [GET] /api/admin/orders/
export const getOrders = async (req, res, next) => {
  const numberLimitOrders = 20;
  const sortedFields = { createdAt: -1 }
  const page = req.query.page || 1;
  const order_status = req.query.order_status ?? null;
  try {
    const orders = await Order.find({
      order_status,
    }, {
      order_details: 0,
    }).sort(sortedFields)
      .skip((page - 1) * numberLimitOrders)
      .limit(numberLimitOrders)
      .exec();

    if (!orders || orders?.length === 0)
      return responseHandler.notFound(res, "Orders Not Found");

    return responseHandler.ok(res, { orders });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

// [GET] /api/orders/order_id
export const getOrder = async (req, res, next) => {
  const orderId = req.params.order_id;
  try {
    const order = await Order.findOne({
      _id: orderId,
    });

    if (!order)
      return responseHandler.notFound(res, "Order Not Found");

    return responseHandler.ok(res, { order });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

// [POST] /api/orders/
export const updateOrderStatus = async (req, res, next) => {
  const { order_id, order_status } = req.body;

  // handle the invalid order_status
  if (!["delivering", "finished", "cancel"].includes(order_status))
    return responseHandler.badRequest(res, "Invalid status!");

  try {
    const order = await Order.findOne(query);

    if (!order)
      return responseHandler.notFound(res, "Order not found or That order does not belong to you!");
    if (order.order_status === order_status)
      return responseHandler.badRequest(res, "Order status is already " + order_status);
    if (!mappingOrderStatus(order.order_status, order_status))
      return responseHandler.badRequest(res, "Order status can't set cause the current status");

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: order_id },
      { order_status },
      { new: true }
    ).exec();

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
    console.log(err);
    next(err);
  }
}