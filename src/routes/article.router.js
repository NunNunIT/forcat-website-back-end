const express = require('express')
const router = express.Router()

const { articleController } = require('../controllers')

router.get('/', articleController.readAll)
router.get('/page/:page', articleController.readAll)

module.exports = router