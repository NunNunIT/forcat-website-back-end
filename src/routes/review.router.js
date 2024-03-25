const express = require('express')
const router = express.Router()

const { reviewController } = require('../controllers')

router.get('/getOverview/:product_id', reviewController.getOverview);

module.exports = router