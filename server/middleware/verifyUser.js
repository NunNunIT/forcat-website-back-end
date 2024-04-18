import jwt from 'jsonwebtoken';
import responseHandler from '../handlers/response.handler.js';
import User from "../models/user.model.js";

export const verifyAccessToken = (req, res, next) => {
  // console.log(JSON.stringify(req.cookies));
  const token = req.cookies.accessToken;
  if (!token)
    return responseHandler.unauthorize(res, 'You are not authenticated!');

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;

    next();
  } catch (err) {
    return responseHandler.error(res, err.message);
  }
}

export const verifyUserAccessToken = async (req, res, next) => {
  const token = req.body.accessToken ?? req.cookies.accessToken;
  console.log("Token:", token)
  if (!token)
    return responseHandler.unauthorize(res, 'You are not authenticated!');

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userData = await User.findById(user.id).select( '_id' );
    return responseHandler.ok(res, userData)

  } catch (err) {
    return responseHandler.error(res, err.message);
  }
}