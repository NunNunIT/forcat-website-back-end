import Product from "../../models/product.model.js";
import responseHandler from "../../handlers/response.handler.js";
import { createSlug } from "../../utils/createSlug.js";

// [GET] /api/admin/products/getProducts
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    if (products?.length == 0 || !products)
      return responseHandler.notFound(res, "Products Not Found");

    const p = req.query.p != "" ? Number(req.query.p) : 0;
    const returnedProducts = products.slice(p * 10, p * 10 + 10);

    const totalPages = Math.ceil(products.length / 10);

    return responseHandler.ok(res, { products: returnedProducts, totalPages });
  } catch (err) {
    console.log(err);
    return responseHandler.error(res);
  }
};

// [GET] /api/admin/products/:pid
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
    console.log(err);
    return responseHandler.error(res);
  }
};

// [POST] /api/admin/products/addProduct
export const addProduct = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length)
      return responseHandler.notFound(res, "No Body Received");

    console.log(req.body);

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

      // console.log(product);

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
    console.log(err);
    return responseHandler.error(res);
  }
};

// [POST] /api/admin/products/updateProduct
export const updateProduct = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length)
      return responseHandler.notFound(res, "No Body Received");

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.body.product.product_id },
      { ...req.body.product }
    );

    // console.log(updatedProduct);

    return responseHandler.ok(res);
  } catch (err) {
    console.log(err);
    return responseHandler.error(res);
  }
};

// [POST] /api/admin/products/deleteProduct
export const deleteProducts = async (req, res, next) => {
  try {
    const deletedProduct = await Product.deleteOne({
      _id: { $in: req.query.pid.split(",") },
    });

    return responseHandler.ok(res, {});
  } catch (err) {
    console.log(err);
    return responseHandler.error(res);
  }
};
