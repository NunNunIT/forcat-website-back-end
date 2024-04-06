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
  const user_id = req.user?.id;
  if (!user_id)
    return responseHandler.unauthorize(res, 'You are not authenticated!');

  const role = req.user?.role;
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
      order_buyer: 1,
      order_address: 1,
      order_total_cost: 1,
      order_process_info: 1,
      order_details: 1,
    };

  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  try {
    const orders = await Order.find(query, select)
      .sort({ createdAt: -1, })
      .skip((page - 1) * limit)
      .limit(limit).exec();

    return responseHandler.ok(res, orders);
  } catch (err) {
    next(err);
  }
}

export const readOne = async (req, res, next) => {
  const user_id = req.user?.id;
  if (!user_id)
    return responseHandler.unauthorize(res, 'You are not authenticated!');

  const role = req.user?.role;
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

  const sort = { createdAt: -1, };
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  try {
    const order = await Order.findOne(query, select)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit).exec();

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