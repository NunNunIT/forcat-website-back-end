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
  let token = req.cookies.accessToken;

  if (token) {
    console.log("accessToken Token:", token)
  } else {
    token = req.cookies.currentUser;
  }

  if (token) {
    console.log("currentUser Token:", token)
  } else {
    token = req.body.accessToken;
    console.log("Body Token:", token)
  }

  if (!token)
    return responseHandler.unauthorize(res, 'You are not authenticated!');

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userData = await User.findById(user.id).select('_id user_role');
    if (!userData) {
      return responseHandler.notFound(res, 'User not exist!');
    }

    // Nếu tất cả đều thành công, trả về dữ liệu với statusCode 200
    return responseHandler.ok(res, userData, "Authenticated user!");
  } catch (err) {
    return responseHandler.error(res, err.message);
  }
}

export const verifyAdminAccessToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token)
    return responseHandler.unauthorize(res, 'You are not authenticated!');

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userData = await User.findById(user.id).select('_id user_role');
    if (!userData || userData.user_role !== 'admin' || user.role !== 'admin') {
      return responseHandler.forbidden(res, 'You are not authorized!');
    }

    // Nếu tất cả đều thành công, trả về dữ liệu với statusCode 200
    next();
  } catch (err) {
    return responseHandler.error(res, err.message);
  }
}