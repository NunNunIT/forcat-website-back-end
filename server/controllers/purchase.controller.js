import Order from '../models/order.model.js';
import responseHandler from '../handlers/response.handler.js';

export const create = async (req, res, next) => {
  const user_id = req.user?.id;
  if (!user_id)
    return responseHandler.unauthorize(res, 'You are not authenticated!');

  const role = req.user?.role;
  if (!role === 'user')
    return responseHandler.forbidden(res, 'You are not authorized!');

  try {
    const order = await Order.create({ ...req.body, customer_id: user_id, });
    return responseHandler.created(res, order);
  } catch (err) {
    next(err);
  }
}

export const readAll = async (req, res, next) => {
  const user_id = req.user?.id ?? '66111adf6b14155548a7a035';
  if (!user_id)
    return responseHandler.unauthorize(res, 'You are not authenticated!');

  const role = req.user?.role ?? 'user';
  if (!role || !['admin', 'user', 'staff'].includes(role))
    return responseHandler.forbidden(res, 'You are not authorized!');

  const query = (['admin', 'staff'].includes(role)) ?
    {} :
    { customer_id: user_id };

  const select = (['admin', 'staff'].includes(role)) ?
    {
      order_note: 0,
      __v: 0
    } :
    {
      order_total_cost: 1,
      order_process_info: 1,
      order_details: 1,
    };

  const { type, page = 1, limit = 10 } = req.query;

  try {
    const orders = await Order.aggregate([
      { $match: query },
      { $addFields: { latest_status: { $arrayElemAt: ["$order_process_info.status", -1] } } },
      ...(type ? [{ $match: { latest_status: type } }] : []),
      { $project: select, },
      { $sort: { createdAt: -1, } },
      { $skip: (page - 1) * limit },
      { $limit: limit }
    ])

    return responseHandler.ok(res, orders);
  } catch (err) {
    next(err);
  }
}

export const readOne = async (req, res, next) => {
  const user_id = req.user?.id ?? '66111adf6b14155548a7a035';
  if (!user_id)
    return responseHandler.unauthorize(res, 'You are not authenticated!');

  const role = req.user?.role ?? 'user';
  if (!role || !['admin', 'user', 'staff'].includes(role))
    return responseHandler.forbidden(res, 'You are not authorized!');

  const order_id = req.params.id;
  const query = (role.includes(['admin', 'staff'])) ?
    { _id: order_id } :
    { _id: order_id, customer_id: user_id };

  const select = (role.includes(['admin', 'staff'])) ?
    {} :
    {
      order_buyer: 1,
      order_address: 1,
      order_total_cost: 1,
      order_process_info: 1,
      order_details: 1,
    };

  try {
    const order = await Order.findOne(query, select).populate("order_details.product_id");

    if (!order)
      return responseHandler.badRequest(res, 'Order not found or That order does not belong to you!');

    return responseHandler.ok(res, order);
  } catch (err) {
    next(err);
  }
}

export const update = async (req, res, next) => {
  return responseHandler.ok(res, 'Update a purchase with id');
}