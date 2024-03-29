const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data);

const error = (res) => responseWithData(res, 500, {
  status: 500,
  success: false,
  message: "Oops! Something worng!"
});

const errorHandler = (res, statusCode, message) => responseWithData(res, statusCode, {
  status: statusCode,
  success: false,
  message
});

const badrequest = (res, message) => responseWithData(res, 400, {
  status: 400,
  success: false,
  message
});

const ok = (res, data) => responseWithData(res, 200, data);

const created = (res, data) => responseWithData(res, 201, data);

const unauthorize = (res) => responseWithData(res, 401, {
  status: 401,
  success: false,
  message: "Unathorized"
});

const notfound = (res) => responseWithData(res, 404, {
  status: 404,
  success: false,
  message: "Resource not found"
});

export default {
  error,
  errorHandler,
  badrequest,
  ok,
  created,
  unauthorize,
  notfound
};