import User from "../models/user.model.js";
import responseHandler from "../handlers/response.handler.js";
import { decryptData, encryptData } from "../utils/security.js";

// [GET] /api/cart
export const getCart = async (req, res, next) => {
  const userId = req.user?.id;

  try {
    const user = await User.findOne({ _id: userId })
      .populate({
        path: "cart.product",
        select: "_id product_name product_slug product_imgs product_variants",
      })
      .exec();

    if (!user) {
      return responseHandler.notFound(res, "Cart Not Found");
    }

    const cartInfo = user.cart.map((cartItem) => ({
      product: {
        product_name: cartItem.product.product_name,
        product_slug: cartItem.product.product_slug,
        product_imgs: cartItem.product.product_imgs,
        product_variants: cartItem.product.product_variants,
        _id: encryptData(cartItem.product._id),
      },
      quantity: cartItem.quantity,
      variant_id: cartItem.variant_id,
    }));
    return responseHandler.ok(res, { cartInfo });
  } catch (err) {
    console.log(err);
    return responseHandler.error(res);
  }
};

// [POST] /api/cart/addCart
export const addCart = async (req, res, next) => {
  const userId = req.user?.id;
  // const userId = "66292d557a3a6d22f489b0f4";
  // console.log(decryptData(decodeURIComponent(req.body.product_id)));
  if (!Object.keys(req.body).length)
    return responseHandler.notFound(res, "No Body Received");

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return responseHandler.notFound(res, "Cart Not Found");
    }

    const productId = decryptData(decodeURIComponent(req.body.product_id));
    const variantId = req.body.variant_id;
    const quantity = req.body.quantity;
    let isExisted = false;

    // handle product existed in cart
    for (let cartItem of user.cart) {
      if (
        cartItem.product.toString() == productId &&
        cartItem.variant_id.toString() == variantId
      ) {
        cartItem.quantity += req.body.quantity;
        isExisted = true;
        break;
      }
    }

    if (!isExisted) {
      // if not existed in cart
      user.cart.push({
        product: productId,
        variant_id: variantId,
        quantity: quantity,
      });
    }

    // save to database
    user.save();
    return responseHandler.ok(res, {});
  } catch (err) {
    console.log(err);
    return responseHandler.error(res);
  }
};

// [POST] /api/cart/updateCart
export const updateCart = async (req, res, next) => {
  const userId = req.user?.id;

  try {
    // find by user_id
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return responseHandler.notFound(res, "Cart Not Found");
    }

    // find and replace user.cart
    const changedItems = req.body.changedItems;
    if (changedItems.length)
      changedItems.forEach((item) => {
        const index = user.cart.findIndex(
          (cartItem) =>
            cartItem.product.toString() ==
            decryptData(decodeURIComponent(item.product_id))
        );
        if (index !== -1) {
          user.cart[index].quantity = item.quantity;
          user.cart[index].variant_id = item.variant_id;
        }
      });

    // find and delete user.cart
    const deletedItems = req.body.deletedItems;
    if (deletedItems.length)
      deletedItems.forEach((item) => {
        const index = user.cart.findIndex(
          (cartItem) =>
            cartItem.product.toString() ==
            decryptData(decodeURIComponent(item.product_id))
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
