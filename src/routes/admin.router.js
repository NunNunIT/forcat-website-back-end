const express = require('express')
const router = express.Router();

// import middleware
const { auth } = require('../middlewares')

// import controller
const adminController = require('../controllers/admin.controller')

router.post('/login', auth.unauthorized, adminController.login)


module.exports = router