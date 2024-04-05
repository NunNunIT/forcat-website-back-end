import jwt from 'jsonwebtoken';
import responseHandler from '../handlers/response.handler.js';

export const verifyAccessToken = (req, res, next) => {
  const token = req.cookies.access_token;
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