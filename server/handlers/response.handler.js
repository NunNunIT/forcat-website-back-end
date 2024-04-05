// Define the response handler with Package Response
const resWithPack = (res, statusCode, pack) => res.status(statusCode).json({
  status: statusCode,
  success: statusCode >= 200 && statusCode < 300,
  ...pack
});

// Define the response handler
// 2xx
const ok = (res, data, message) => resWithPack(res, 200, { data, message });
const created = (res, data, message) => resWithPack(res, 201, { data, message });

// 4xx
const badRequest = (res, message = 'Bad Request') => resWithPack(res, 400, { message });
const unauthorize = (res, message = 'Unauthorized') => resWithPack(res, 401, { message });
const forbidden = (res, message = 'Forbidden') => resWithPack(res, 403, { message });
const notFound = (res, message = 'Resource not found') => resWithPack(res, 404, { message });
const conflict = (res, message = 'Conflict') => resWithPack(res, 409, { message });

// 5xx
const error = (res, message) => resWithPack(res, 500, { message: message ?? "Oops! Something wrong!" });

export default {
  resWithPack,
  ok,
  created,
  badRequest,
  unauthorize,
  forbidden,
  notFound,
  conflict,
  error,
};
