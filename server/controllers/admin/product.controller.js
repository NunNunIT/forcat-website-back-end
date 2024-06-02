import Product from "../../models/product.model.js";
import responseHandler from "../../handlers/response.handler.js";
import { createSlug } from "../../utils/createSlug.js";

// [GET] /api/admin/product/getProducts
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    if (products?.length == 0 || !products)
      return responseHandler.notFound(res, "Products Not Found");

    return responseHandler.ok(res, { products });
  } catch (err) {
    console.error(err);
    return responseHandler.error(res);
  }
};

// [GET] /api/admin/product/:pid
export const getProduct = async (req, res, next) => {
  try {
    const productId = req.params.pid;
    const product = await Product.findOne({
      _id: productId,
    });

    if (!product) {
      return responseHandler.notFound(res, "Product Not Found");
    }

    return responseHandler.ok(res, { product });
  } catch (err) {
    console.error(err);
    return responseHandler.error(res);
  }
};

// [POST] /api/admin/product/addProduct
export const addProduct = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length)
      return responseHandler.notFound(res, "No Body Received");

    let existedProduct = await Product.findOne({
      product_slug: createSlug(req.body.product.product_name),
    });

    if (!existedProduct) {
      const product = new Product({
        ...req.body.product,
        product_slug:
          req.body.product.product_slug ??
          createSlug(req.body.product.product_name),
      });

      product.save();
    } else {
      const updatedProduct = await Product.updateOne(
        {
          product_slug: createSlug(req.body.product.product_name),
        },
        { ...req.body.product }
      );

      // console.log(updatedProduct);
    }

    return responseHandler.ok(res, {});
  } catch (err) {
    console.error(err);
    return responseHandler.error(res);
  }
};

// [POST] /api/admin/product/updateProduct
export const updateProduct = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length)
      return responseHandler.notFound(res, "No Body Received");

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.body.product_id },
      { ...req.body.product_info }
    );

    // console.log(updatedProduct);

    return responseHandler.ok(res);
  } catch (err) {
    console.error(err);
    return responseHandler.error(res);
  }
};

// [POST] /api/admin/product/deleteProduct
export const deleteProduct = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length)
      return responseHandler.notFound(res, "No Body Received");

    const deletedProduct = await Product.deleteOne({
      _id: req.body.product_id,
    });

    return responseHandler.ok(res, {});
  } catch (err) {
    console.error(err);
    return responseHandler.error(res);
  }
};
