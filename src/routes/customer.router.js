const express = require('express')
const router = express.Router()

// const { adminMiddleware, customerMiddleware } = require('../middlewares')
const { auth } = require('../middlewares')

const { customerController } = require('../controllers')

router.post('/login', auth.unauthorized, customerController.login);
router.post('/register', auth.unauthorized, customerController.create);

router.get('/', auth.admin, customerController.readAll);
router.get('/:id', auth.adminOrCurrentCustomer, customerController.read);

router.put('/update/:id', auth.adminOrCurrentCustomer, customerController.update);

module.exports = router