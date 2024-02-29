const express = require('express')
const router = express.Router()

const { auth } = require('../middlewares')

const { customerController } = require('../controllers')

// Thực hiện đăng nhập thì yêu cầu chưa có token trong header
router.post('/login', auth.unauthorized, customerController.login);

// Thực hiện đăng ký thì yêu cầu chưa có token trong header
router.post('/register', auth.unauthorized, customerController.create);

// Thực hiện lấy tất cả thông tin khách hàng thì yêu cầu phải là admin
router.get('/', auth.admin, customerController.readAll);

// Thực hiện lấy thông tin một khách hàng thì yêu cầu phải là admin hoặc là chính khách hàng đó
router.get('/:id', auth.adminOrCurrentCustomer, customerController.read);

// Thực hiện cập nhật thông tin một khách hàng thì yêu cầu phải là admin hoặc là chính khách hàng đó
router.put('/update/:id', auth.adminOrCurrentCustomer, customerController.update);

module.exports = router