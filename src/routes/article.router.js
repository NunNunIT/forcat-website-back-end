const express = require('express')
const router = express.Router()

const { articleController } = require('../controllers')

// create
router.post('/', articleController.create);

// readAll
router.get('/', articleController.readAll)
router.get('/page/', articleController.readAll)
router.get('/page/:page', articleController.readAll)
router.get('/limit/', articleController.readAll)
router.get('/limit/:limit', articleController.readAll)
router.get('/page/:page/limit/:limit', articleController.readAll)
router.get('/limit/:limit/page/:page', articleController.readAll)

// readOne
router.get('/:slug', articleController.read)

// update
router.post('/update/:slug', articleController.update)


module.exports = router