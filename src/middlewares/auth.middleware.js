const { AdminModel, CustomerModel } = require('../models');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const auth = () => { };

auth.unauthorized = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    return res.status(403).json({
      statusCode: 403,
      err: 'Forbidden',
      msg: 'Only request without bearerHeader is allowed.'
    });
  }

  return next();
}

auth.verifyToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
      return res.status(400).json({
        statusCode: 400,
        err: 'Bad Request',
        msg: 'Your request is missing the bearerHeader.'
      });
    }

    const tokenVerify = promisify(jwt.verify);
    const token = bearerHeader.split(' ')[1];
    const { id, role } = await tokenVerify(token, process.env.JWT_SECRET);
    if (!id || !role) {
      return res.status(401).json({
        statusCode: 401,
        err: 'Unauthorized',
        msg: 'Unauthorized token'
      });
    }

    req.user = { id, role };
    return next();
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      err: 'Internal Server Error',
      msg: 'Invalid token'
    });
  }
}

auth.admin = async (req, res, next) => {
  auth.verifyToken(req, res, async () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        statusCode: 403,
        err: 'Forbidden',
        msg: 'You must be an admin to request.'
      });
    }

    const adminAccount = await AdminModel.findById(req.user.id).exec();
    if (!adminAccount) {
      return res.status(401).json({
        statusCode: 401,
        err: 'Unauthorized',
        msg: 'Can\'t find admin account with this token.'
      });
    }

    return next();
  })
}

auth.customer = async (req, res, next) => {
  auth.verifyToken(req, res, async () => {
    if (req.user.role !== 'customer') {
      return res.status(403).json({
        statusCode: 403,
        err: 'Forbidden',
        msg: 'You must be a customer to request.'
      });
    }

    const customerAccount = await CustomerModel.findById(req.user.id).exec();
    if (!customerAccount) {
      return res.status(401).json({
        statusCode: 401,
        err: 'Unauthorized',
        msg: 'Can\'t find customer account with this token.'
      });
    }

    return next();
  })
}

auth.currentCustomer = async (req, res, next) => {
  auth.verifyToken(req, res, async () => {
    if (req.user.role !== 'customer') {
      return res.status(403).json({
        statusCode: 403,
        err: 'Forbidden',
        msg: 'You must be a customer to request.'
      });
    }

    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        statusCode: 403,
        err: 'Forbidden',
        msg: 'You must request on your account.'
      });
    }

    const customerAccount = await CustomerModel.findById(req.user.id).exec();
    if (!customerAccount) {
      return res.status(401).json({
        statusCode: 401,
        err: 'Unauthorized',
        msg: 'Can\'t find customer account with this token.'
      });
    };

    return next();
  })
}

auth.adminOrCurrentCustomer = async (req, res, next) => {
  auth.verifyToken(req, res, async () => {
    if (req.user.role !== 'admin' && req.user.role !== 'customer') {
      return res.status(403).json({
        statusCode: 403,
        err: 'Forbidden',
        msg: 'You must be an admin or a customer to request.'
      });
    }

    if (req.user.role === 'customer' && req.user.id !== req.params.id) {
      return res.status(403).json({
        statusCode: 403,
        err: 'Forbidden',
        msg: 'You must request on your account.'
      });
    }

    const model = req.user.role === 'admin' ? AdminModel : (req.user.role === 'customer' ? CustomerModel : null);
    const account = await model.findById(req.user.id).exec();
    if (!account) {
      return res.status(401).json({
        statusCode: 401,
        err: 'Unauthorized',
        msg: 'Can\'t find account with this token.'
      });
    }

    return next();
  })
}


module.exports = auth;