const express = require('express')
const router = express.Router()

// const { adminMiddleware, customerMiddleware } = require('../middlewares')
const middleware = require('../middlewares')

const { customerController } = require('../controllers')

router.post('/login', middleware.unauthorized, customerController.login);
router.post('/register', middleware.unauthorized, customerController.create);

router.get('/', middleware.admin, customerController.readAll);
router.get('/:id', middleware.customerAbove, customerController.read);

router.put('/update/:id', middleware.customerAbove, customerController.update);

module.exports = router