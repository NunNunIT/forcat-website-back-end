import User from "../models/user.model.js";
import responseHandler from "../handlers/response.handler.js";

// [GET] /api/cart/getCart/:user_id
export const getCart = async (req, res, next) => {
  const userId = req.params.user_id;

  try {
    const user = await User.findOne({ _id: userId })
      .populate({
        path: "cart.product",
        select: "_id product_name product_imgs product_variants",
      })
      .exec();
    if (!user) {
      return responseHandler.badrequest(res, "Cart Not Found");
    }
    const cartInfo = user.cart;

    return responseHandler.ok(res, { cartInfo });
  } catch (err) {
    console.log(err);
    return responseHandler.error(res);
  }
};

// [POST] /api/cart/updateCart/:user_id
export const updateCart = async (req, res, next) => {
  const userId = req.params.user_id;

  try {
    // find by user_id
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return responseHandler.badrequest(res, "Cart Not Found");
    }

    // find and replace user.cart
    const changedItems = req.body.changedItems;
    console.log(changedItems);
    changedItems.forEach((item) => {
      const index = user.cart.findIndex(
        (cartItem) => cartItem.product.toString() == item.product_id
      );
      user.cart[index].quantity = item.quantity;
      user.cart[index].variant_id = item.variant_id;
    });

    // find and delete user.cart
    const deletedItems = req.body.deletedItems;
    deletedItems.forEach((item) => {
      const index = user.cart.findIndex(
        (cartItem) => cartItem.product.toString() == item.product_id
      );
      user.cart.splice(index, 1);
    });

    // save to database
    user.save();
    return responseHandler.ok(res, {});
  } catch (err) {
    console.log(err);
    return responseHandler.error(res);
  }
};
