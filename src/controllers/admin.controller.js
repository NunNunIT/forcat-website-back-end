const { AdminModel } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adminController = () => { }

adminController.login = async (req, res, next) => {
  const { login_name, password } = req.body;

  if (!login_name || !password) {
    return res.status(400).json({
      statusCode: 400,
      err: 'Bad Request',
      msg: 'Missing login credentials',
    });
  }

  try {
    const account = await AdminModel.findOne({ login_name }).exec();

    if (!account) {
      return res.status(401).json({
        statusCode: 401,
        err: 'Unauthorized',
        msg: 'login_name',
      })
    }

    if (!await bcrypt.compare(password, account.password)) {
      return res.status(401).json({
        statusCode: 401,
        err: 'Unauthorized',
        msg: 'password'
      })
    }

    const { id } = account;

    const token = jwt.sign(
      { id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    )

    return res.status(200).json({
      statusCode: 200,
      msg: 'Successful login',
      data: token,
    })
  } catch (err) {
    // Handle database or other unexpected errors
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      err: 'Internal Server Error',
      msg: 'An error occurred during login',
    });
  }
}

module.exports = adminController