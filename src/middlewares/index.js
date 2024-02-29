const { AdminModel, CustomerModel } = require('../models');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const middleware = () => { };

middleware.unauthorized = async (req, res, next) => {
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

middleware.admin = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {
    return res.status(400).json({
      statusCode: 400,
      err: 'Bad Request',
      msg: 'Your request is missing the bearerHeader.'
    })
  }

  try {
    const bearerToken = bearerHeader.split(' ')[1];
    const tokenVerify = promisify(jwt.verify);
    const { id, role } = await tokenVerify(bearerToken, process.env.JWT_SECRET);
    if (role !== 'admin') {
      return res.status(403).json({
        statusCode: 403,
        err: 'Forbidden',
        msg: 'You must be an admin to request.'
      });
    }

    const adminAccount = await AdminModel.findById(id).exec();
    if (!adminAccount) {
      return res.status(401).json({
        statusCode: 401,
        err: 'Unauthorized',
        msg: 'Unauthorized token'
      });
    }

    res.locals.id = id;
    res.locals.role = role;
    return next();

  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      err: 'Internal Server Error',
      msg: 'Invalid token'
    })
  }
};

middleware.customer = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {
    return res.status(400).json({
      statusCode: 400,
      err: 'Bad Request',
      msg: 'Your request is missing the bearerHeader.'
    })
  }

  try {
    const bearerToken = bearerHeader.split(' ')[1];
    const tokenVerify = promisify(jwt.verify);
    const { id, role } = await tokenVerify(bearerToken, process.env.JWT_SECRET);
    if (role !== 'customer') {
      return res.status(403).json({
        statusCode: 403,
        err: 'Forbidden',
        msg: 'You must be an admin to request.'
      });
    }

    const customerAccount = await CustomerModel.findById(id).exec();
    if (!customerAccount) {
      return res.status(401).json({
        statusCode: 401,
        err: 'Unauthorized',
        msg: 'Unauthorized token'
      });
    }

    res.locals.id = id;
    res.locals.role = role;
    return next();

  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      err: 'Internal Server Error',
      msg: 'Invalid token'
    })
  }
}

middleware.customerAbove = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {
    return res.status(400).json({
      statusCode: 400,
      err: 'Bad Request',
      msg: 'Your request is missing the bearerHeader.'
    })
  }

  try {
    const bearerToken = bearerHeader.split(' ')[1];
    const tokenVerify = promisify(jwt.verify);
    const { id, role } = await tokenVerify(bearerToken, process.env.JWT_SECRET);
    if (role !== 'admin' && role !== 'customer') {
      return res.status(400).json({
        statusCode: 400,
        err: 'Bad Request',
        msg: 'Invalid token.'
      });
    }

    const model = role === 'admin' ? AdminModel : (role === 'customer' ? CustomerModel : null);

    const account = await model?.findById(id).exec();
    if (!account) {
      return res.status(401).json({
        statusCode: 401,
        err: 'Unauthorized',
        msg: 'Unauthorized token'
      });
    }

    res.locals.id = id;
    res.locals.role = role;
    return next();

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      err: 'Internal Server Error',
      msg: 'Invalid token'
    })
  }
}

module.exports = middleware;