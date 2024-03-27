const { ProductModel } = require('../models')

const productController = () => { }

productController.getProduct = async (req, res, next) => {
    const productSlug = req.params.product_slug;
    const variantName = req.params.variant_name;

    try {
        const product = await ProductModel.findOne({ product_slug: productSlug }).exec();

        if (!product) {
            return res.status(404).json({
                statusCode: 404,
                message: "Product not found",
            });
        }

        const productCategory = product.categories[0].category;
        const productId = product.product_id
        const relatedProducts = await ProductModel.find({
            categories: { $elemMatch: { category: productCategory } },
            product_id: { $ne: productId },
        });

        return res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: { product, relatedProducts }
        });
    }
    catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error"
        });
    }
}

module.exports = productController
