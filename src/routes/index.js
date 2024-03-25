const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/admin', require('./admin.router'));
apiRouter.use('/customer', require('./customer.router'))
apiRouter.use('/product', require('./product.router'))

const route = app => {
  app.use('/api', apiRouter);
  app.use((req, res) => {
    res.status(404).json({
      message: "Not found",
      statusCode: 404,
    });
  });
}

module.exports = route;