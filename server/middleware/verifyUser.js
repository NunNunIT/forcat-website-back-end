import jwt from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import User from "../models/user.model.js";

export const verifyAccessToken = (req, res, next) => {
  // const token = req.cookies.accessToken ?? req.body.accessToken;
  const token = req.cookies.accessToken;
  console.log("Token Authenicated:", token);
  if (!token)
    return responseHandler.unauthorize(res, "You are not authenticated!");

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;

    next();
  } catch (err) {
    return responseHandler.error(res, err.message);
  }
}

export const verifyUserAccessToken = async (req, res, next) => {
  // const token = req.cookies.currentUser ?? req.body.accessToken;
  const token = req.cookies.accessToken;
  console.log("Middleware Token:", token)
  if (!token)
    return responseHandler.unauthorize(res, 'You are not authenticated!');

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userData = await User.findById(user.id).select('_id');
    if (!userData) {
      return responseHandler.notFound(res, 'User not exist!');
    }
    // Nếu tất cả đều thành công, trả về dữ liệu với statusCode 200
    return responseHandler.ok(res, "", "Authenticated user!");
  } catch (err) {
    return responseHandler.error(res, err.message);
  }
}