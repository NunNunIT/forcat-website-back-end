// Define the response handler with Package Response
const resWithPack = (res, statusCode, pack) => res.status(statusCode).json({
  status: statusCode,
  success: statusCode >= 200 && statusCode < 300,
  ...pack
});

// Define the response handler
// 2xx
const ok = (res, data) => resWithPack(res, 200, { data });
const created = (res, data) => resWithPack(res, 201, { data });

// 4xx
const badRequest = (res, message) => resWithPack(res, 400, { message: message ?? "Bad Required" });
const unauthorize = (res, message) => resWithPack(res, 401, { message: message ?? "Unauthorized" });
const notFound = (res, message) => resWithPack(res, 404, { message: message ?? "Resource not found" });
const conflict = (res, message) => resWithPack(res, 409, { message: message ?? "Conflict" });

// 5xx
const error = (res, message) => resWithPack(res, 500, { message: message ?? "Oops! Something wrong!" });

export default {
  resWithPack,
  ok,
  created,
  badRequest,
  unauthorize,
  notFound,
  error,
};
