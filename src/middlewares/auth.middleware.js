const { AdminModel, CustomerModel } = require('../models');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const auth = () => { };

// verifyToken() kiểm tra token
// bao gồm:
// - kiểm bearerHeader có tồn tại hay không
// - kiểm tra thông tin id, role có trong token hay không
// nếu thỏa hết thì next(), ngược lại trả về lỗi
const verifyToken = async (req, res, next) => {
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

// patternAuth() kiểm tra token và role
// bao gồm:
// - kiểm tra token bằng verifyToken()
// - kiểm tra role có trong mảng allowedRoles hay không
// - kiểm tra điều kiện additionalCondition có thỏa mãn hay không
// - kiểm tra account có tồn tại hay không bằng id trong token
// nếu thỏa hết thì next(), ngược lại trả về lỗi
const patternAuth = async (req, res, next, allowedRoles, additionalCondition) => {
  verifyToken(req, res, async () => {
    if (!allowedRoles.includes(req.user.role) ||
      (additionalCondition && !additionalCondition(req))
    ) {
      return res.status(403).json({
        statusCode: 403,
        err: 'Forbidden',
        msg: 'You do not have permission to perform this request.',
      });
    }

    const model = req.user.role === 'admin' ? AdminModel :
      (req.user.role === 'customer' ? CustomerModel : null);
    const account = await model.findById(req.user.id).exec();
    if (!account) {
      return res.status(401).json({
        statusCode: 401,
        err: 'Unauthorized',
        msg: 'Can\'t find account with this token.',
      });
    }

    return next();
  });
}

const isCurrentAccount = req => req.user.id === req.params.id;

// auth.unauthorized kiểm tra request có bearerHeader hay không
// nếu có thì trả về lỗi, ngược lại next()
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

// auth.admin kiểm tra token và role có phải admin hay không
// nếu thỏa mãn thì next(), ngược lại trả về lỗi
auth.admin = async (req, res, next) => await patternAuth(
  req, res, next,
  ['admin'],
);

// auth.customer kiểm tra token và role có phải customer hay không
// nếu thỏa mãn thì next(), ngược lại trả về lỗi
auth.customer = async (req, res, next) => await patternAuth(
  req, res, next,
  ['customer'],
);

// auth.currentCustomer kiểm tra token và role có phải customer và id yêu cầu có phải id trong token hay không
// nếu thỏa mãn thì next(), ngược lại trả về lỗi
auth.currentCustomer = async (req, res, next) => await patternAuth(
  req, res, next,
  ['customer'],
  isCurrentAccount,
);

// auth.adminOrCurrentCustomer kiểm tra token và role có phải admin hoặc customer
// nếu là role customer thì id yêu cầu có phải id trong token hay không
// nếu thỏa mãn thì next(), ngược lại trả về lỗi
auth.adminOrCurrentCustomer = async (req, res, next) => await patternAuth(
  req, res, next,
  ['admin', 'customer'],
  req => req.user.role !== 'customer' || isCurrentAccount(req),
);

module.exports = auth;