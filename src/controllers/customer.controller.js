const { CustomerModel } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const customerController = () => { }

customerController.login = async (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({
      statusCode: 400,
      err: 'Bad Request',
      msg: 'Missing login credentials',
    });
  }

  try {
    const customerAccount = await CustomerModel.findOne({ phone }).exec();

    if (!customerAccount) {
      return res.status(401).json({
        statusCode: 401,
        err: 'Unauthorized',
        msg: 'phone',
      })
    }

    if (!await bcrypt.compare(password, customerAccount.password)) {
      return res.status(401).json({
        statusCode: 401,
        msg: 'Unauthorized',
        msg: 'password'
      })
    }

    const { id } = customerAccount;

    const token = jwt.sign(
      { id, role: 'customer' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES },
    );

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

customerController.create = async (req, res, next) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({
      statusCode: 400,
      err: 'Bad Request',
      msg: 'Missing login credentials',
    });
  }

  const previousAccount = await CustomerModel.findOne({ phone }).exec();
  if (previousAccount) {
    return res.status(409).json({
      statusCode: 409,
      err: 'Conflict',
      msg: 'Account already exists',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const account = await CustomerModel.create({ phone, password: hashedPassword });

    return res.status(201).json({
      statusCode: 201,
      msg: 'Account created successfully',
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      err: 'Internal Error Server',
      msg: 'An error occurred during account creation',
    })
  }
}

customerController.readAll = async (req, res, next) => {
  try {
    const accounts = await CustomerModel.find({}).exec();

    return res.status(200).json({
      statusCode: 200,
      msg: 'Successful',
      data: accounts
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      err: 'Internal Error Server',
      msg: 'An error occurred during find all accounts',
    })
  }
}

customerController.read = async (req, res, next) => {
  try {
    const account = await CustomerModel.findById(req.params.id);

    if (!account) {
      return res.status(404).json({
        statusCode: 404,
        err: 'Not Found',
        msg: 'Not found account by id.'
      })
    }

    return res.status(200).json({
      statusCode: 200,
      msg: 'Successful',
      data: account
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      err: 'Internal Error Server',
      msg: 'An error occurred during find account by id',
    })
  }
}

customerController.update = async (req, res, next) => {
  const { id, role } = res.locals;
  const { name, email, address } = req.body;

  try {
    const account = await CustomerModel.findByIdAndUpdate(req.params.id, { name, email, address }).exec();

    if (!account) {
      return res.status(404).json({
        statusCode: 404,
        err: 'Not Found',
        msg: 'Not found account by id.'
      })
    }

    return res.status(200).json({
      statusCode: 200,
      msg: 'Successful',
      data: account
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      err: 'Internal Error Server',
      msg: 'An error occurred during login',
    })
  }
}

module.exports = customerController