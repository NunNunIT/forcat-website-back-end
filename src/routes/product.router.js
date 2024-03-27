const express = require('express')
const router = express.Router()

const { productController } = require('../controllers')

router.get('/:product_slug/:variant_name', productController.getProduct);

module.exports = router