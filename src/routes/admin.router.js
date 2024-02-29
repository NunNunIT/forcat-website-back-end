const express = require('express')
const router = express.Router();

// import middleware
const { auth } = require('../middlewares')

// import controller
const adminController = require('../controllers/admin.controller')

// Thực hiện đăng nhập thì yêu cầu chưa có token trong header
router.post('/login', auth.unauthorized, adminController.login)


module.exports = router