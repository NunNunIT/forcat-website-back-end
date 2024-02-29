const express = require('express')
const router = express.Router();

// import middleware
const middlewares = require('../middlewares')

// import controller
const adminController = require('../controllers/admin.controller')

router.post('/login', middlewares.unauthorized, adminController.login)


module.exports = router