import Order from "../models/order.model.js";
import Review from "../models/review.model.js";
import mongoose from "mongoose";
import Notification from "../models/notification.model.js";
import responseHandler from "../handlers/response.handler.js";
import mappingOrderStatus from "../utils/mappingOrderStatus.js";
import { encryptData } from "../utils/security.js";

const createFromHexString = mongoose.Types.ObjectId.createFromHexString;

const handleOrderDetailsAfterPopulate = (order
  // , isHashedProductId = true
) => ({
  ...order._doc,
  order_details: order._doc.order_details.map(
    detail => {
      // get variant from product_variants
      const variant = detail.product_id?.product_variants.find(
        variant => variant.toObject().variant_id === detail.variant_id
      );

      // const id = isHashedProductId
      //   ? { product_id_hashed: encryptData(detail.product_id?._id) }
      //   : { product_id: detail.product_id?._id }

      return {
        // ...id,
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
});

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

  // default page = 1, limit = 10
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
    const maxPage = Math.ceil(await Order.countDocuments(query) / limit);
    if (maxPage == 0)
      return responseHandler.ok(res, { orders: [], maxPage: 1 });

    if (page > maxPage)
      return responseHandler.badRequest(res, { message: "Page out of range!", maxPage });

    const orders = await Order.find(query, select)
      .populate("order_details.product_id", "product_name product_slug product_imgs product_variants")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Iterate over order details and add necessary fields
    const handledOrders = orders.map(handleOrderDetailsAfterPopulate);

    return responseHandler.ok(res, { orders: handledOrders, maxPage });
  } catch (err) {
    next(err);
  }
}

// [GET] /api/orders/:order_id
export const readOne = async (req, res, next) => {
  const user_id = req.user?.id ?? req.query?.id ?? "661754a9ae209b64b08e6874";
  if (!user_id)
    return responseHandler.unauthorize(res, "You are not authenticated!");

  const role = req.user?.role ?? "user";
  if (!role || !["admin", "user", "staff"].includes(role))
    return responseHandler.forbidden(res, "You are not authorized!");

  const order_id = req.params.order_id;
  const query = (role.includes(["admin", "staff"])) ?
    { _id: order_id } :
    { _id: order_id, customer_id: user_id };

  const select = (role.includes(["admin", "staff"])) ?
    {} :
    {
      order_buyer: 1,
      order_address: 1,
      order_status: 1,
      order_total_cost: 1,
      order_details: 1,
      createdAt: 1,
    };

  try {
    const order = await Order.findOne(query, select)
      .populate("order_details.product_id", "product_name product_slug product_imgs product_variants");

    if (!order)
      return responseHandler.badRequest(res, "Order not found or That order does not belong to you!");

    const handledOrder = handleOrderDetailsAfterPopulate(order);

    return responseHandler.ok(res, handledOrder);
  } catch (err) {
    next(err);
  }
}

// [POST] /api/orders/:order_id/edit
export const update = async (req, res, next) => {
  return responseHandler.ok(res, null, "Update order");
}

// [POST] /api/orders/:order_id/:order_status
export const updateStatus = async (req, res, next) => {
  const user_id = req.user?.id ?? req.query?.user_id ?? "661754a9ae209b64b08e6874";
  if (!user_id)
    return responseHandler.unauthorize(res, "You are not authenticated!");

  const role = req.user?.role ?? "user";
  if (!role || !["admin", "user", "staff"].includes(role))
    return responseHandler.forbidden(res, "You are not authorized!");

  const order_id = req.params.order_id;

  // handle the invalid order_status
  const order_status = req.params.order_status;
  if (!["delivering", "finished", "cancel"].includes(order_status))
    return responseHandler.badRequest(res, "Invalid status!");

  const query = (role.includes(["admin", "staff"])) ?
    { _id: order_id } :
    { _id: order_id, customer_id: user_id };

  try {
    const order = await Order.findOne(query);

    if (!order)
      return responseHandler.notFound(res, "Order not found or That order does not belong to you!");
    if (order.order_status === order_status)
      return responseHandler.badRequest(res, "Order status is already " + order_status);
    if (!mappingOrderStatus(order.order_status, order_status))
      return responseHandler.badRequest(res, "Order status can't set cause the current status");

    // Update order_status, order_process_info
    const updatedOrder = await Order.findOneAndUpdate(query, {
      $set: { order_status },
      $push: { order_process_info: { status: order_status, date: new Date() } }
    })

    console.log(updatedOrder);

    return responseHandler.ok(res, null, "Updated");
  } catch (err) {
    next(err);
  }
}

// [GET] a/pi/orders/:order_id/reviews
// Lấy tất cả reviews bên trong order_id
export const readAllReviews = async (req, res, next) => {
  const user_id = req.user?.id ?? req.query?.user_id ?? "661754a9ae209b64b08e6874";
  if (!user_id)
    return responseHandler.unauthorize(res, "You are not authenticated!");

  const role = req.user?.role ?? "user";
  if (!role || !["admin", "user", "staff"].includes(role))
    return responseHandler.forbidden(res, "You are not authorized!");

  const order_id = req.params.order_id;

  const query_order = ["admin", "staff"].includes(role)
    ? { _id: order_id }
    : { _id: order_id, customer_id: user_id, order_status: "finished" };

  const query_reviews = (role.includes(["admin", "staff"])) ?
    { order_id } :
    { order_id, user_id };
  const select_reviews = (role.includes(["admin", "staff"])) ?
    {} :
    { review_rating: 1, review_context: 1, review_imgs: 1, review_videos: 1, createdAt: 1 };

  try {
    const order = await Order.findOne(query_order)
      .populate("order_details.product_id", "product_name product_slug product_imgs product_variants");
    if (!order)
      return responseHandler.badRequest(res, "Order not found, That order does not belong to you or That order is not finished!");

    const handledOrder = handleOrderDetailsAfterPopulate(order);
    const reviews = await Review.find(query_reviews, select_reviews);
    const handledReview = handledOrder?.order_details.map(
      order => {
        const { product_img, ...rest } = order;
        const review = reviews.find(
          reviews => reviews.order_id === order._id
        )?.toObject()
          ?? { review_rating: 5, review_context: "" };

        return {
          ...rest,
          variant_img: product_img,
          ...review,
        }
      }
    )

    return responseHandler.ok(res, handledReview);
  } catch (err) {
    next(err);
  }
}