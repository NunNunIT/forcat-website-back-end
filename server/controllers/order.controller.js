import Order from "../models/order.model.js";
import mongoose from "mongoose";
import Notification from "../models/notification.model.js";
import responseHandler from "../handlers/response.handler.js";

const createFromHexString = mongoose.Types.ObjectId.createFromHexString;

// [POST] /api/orders/
export const create = async (req, res, next) => {
  const orderInfo = req.body;

  const user_id = req.user?.id ?? req.query?.user_id ?? "661754a9ae209b64b08e6874";
  if (!user_id)
    return responseHandler.unauthorize(res, "You are not authenticated!");

  const role = req.user?.role ?? "user";
  if (!role === "user")
    return responseHandler.forbidden(res, "You are not authorized!");

  try {
    const newOrder = {
      customer_id: user_id,
      ...orderInfo,
    };

    await Order.create(newOrder);

    const notiOrder = {
      notification_name: "Thông báo đặt hàng thành công",
      notification_type: "order",
      notification_description: `
        <p>Th&ocirc;ng b&aacute;o đ&atilde; đặt h&agrave;ng th&agrave;nh c&ocirc;ng</p>
      `,
      users: {
        usersList: [
          { user: user_id },
        ],
      },
    };

    await Notification.create(notiOrder);

    return responseHandler.created(res);
  } catch (error) {
    next(error);
  }
};

// [GET] /api/orders/
export const readAll = async (req, res, next) => {
  const user_id = req.user?.id ?? req.query?.user_id ?? "661754a9ae209b64b08e6874";
  if (!user_id)
    return responseHandler.unauthorize(res, "You are not authenticated!");

  const role = req.user?.role ?? "user";
  if (!role || !["admin", "user", "staff"].includes(role))
    return responseHandler.forbidden(res, "You are not authorized!");

  const select = (["admin", "staff"].includes(role)) ?
    {
      order_note: 0,
      __v: 0,
    } :
    {
      order_status: 1,
      order_details: 1,
      order_total_cost: 1,
    };

  const { type, page = 1, limit = 10 } = req.query;

  const query = (["admin", "staff"].includes(role)) ?
    {
      ...(type ? { order_status: type } : {})
    } :
    {
      customer_id: createFromHexString(user_id),
      ...(type ? { order_status: type } : {})
    };

  try {
    const orders = await Order.find(query, select)
      .populate("order_details.product_id", "product_name product_slug product_imgs product_variants")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Iterate over order details and add necessary fields
    const handledOrders = orders.map(
      order => ({
        ...order._doc,
        order_details: order._doc.order_details.map(
          detail => {
            // get variant from product_variants
            const variant = detail.product_id?.product_variants.find(
              variant => variant.toObject().variant_id === detail.variant_id
            );

            return {
              product_id: detail.product_id?._id,
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
      })
    );

    return responseHandler.ok(res, handledOrders);
  } catch (err) {
    next(err);
  }
}

// [GET] /api/orders/:id
export const readOne = async (req, res, next) => {
  const user_id = req.user?.id ?? req.query?.id ?? "661754a9ae209b64b08e6874";
  if (!user_id)
    return responseHandler.unauthorize(res, "You are not authenticated!");

  const role = req.user?.role ?? "user";
  if (!role || !["admin", "user", "staff"].includes(role))
    return responseHandler.forbidden(res, "You are not authorized!");

  const order_id = req.params.id;
  const query = (role.includes(["admin", "staff"])) ?
    { _id: order_id } :
    { _id: order_id, customer_id: user_id };

  const select = (role.includes(["admin", "staff"])) ?
    {} :
    {
      order_buyer: 1,
      order_address: 1,
      order_total_cost: 1,
      order_process_info: 1,
      order_details: 1,
    };

  try {
    const order = await Order.findOne(query, select)
      .populate("order_details.product_id", "product_name product_slug product_imgs product_variants");

    if (!order)
      return responseHandler.badRequest(res, "Order not found or That order does not belong to you!");

    const handledOrder = {
      ...order._doc,
      order_details: order._doc.order_details.map(
        detail => {
          // get variant from product_variants
          const variant = detail.product_id?.product_variants.find(
            variant => variant.toObject().variant_id === detail.variant_id
          );

          return {
            product_id: detail.product_id?._id,
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
    }

    return responseHandler.ok(res, handledOrder);
  } catch (err) {
    next(err);
  }
}

// [POST] /api/orders/edit/:id
export const update = async (req, res, next) => {
  return responseHandler.created(res, null, "Update order");
}