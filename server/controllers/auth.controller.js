import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import responseHandler from "../handlers/response.handler.js";
import jwt from 'jsonwebtoken';

const HOUR = 3600000;

export const register = async (req, res, next) => {
  const { user_email, user_name, user_password } = req.body;
  if (!(user_email && user_name && user_password))
    return responseHandler.badRequest(res, 'All input is required');

  const checkUser = await User.findOne({ user_email });

  if (checkUser)
    return responseHandler.badRequest(res, 'Username already used');

  const user_data = {
    user_login_name:
      user_name.split(' ').join('').toLowerCase() +
      Math.random().toString(36).slice(-8),
    user_name,
    user_password: bcryptjs.hashSync(user_password, 10),
    user_email,
  }

  try {
    await User.create(user_data);
    return responseHandler.created(res);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { user_email, user_password } = req.body;

  const checkUser = await User.findOne({ user_email });
  if (!checkUser)
    return responseHandler.notFound(res, "Tài khoản không tồn tại!");

  const checkPassword = bcryptjs.compareSync(user_password, checkUser.user_password);
  if (!checkPassword)
    return responseHandler.unauthorize(res);

  try {
    const { user_password: hashedPassword, ...rest } = checkUser._doc;
    const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET_KEY);
    const expiryDate = new Date(Date.now() + HOUR); // 1 hour

    res.cookie('access_token', token, {
      httpOnly: true,
      expires: expiryDate
    });

    return responseHandler.ok(res, rest);
  } catch (error) {
    next(error)
  }
}

export const loginWithGoogle = async (req, res, next) => {
  try {
    const checkUser = await User.findOne({ user_email: req.body.email });
    if (checkUser) {
      const { user_password: hashedPassword, ...rest } = user._doc;

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      const expiryDate = new Date(Date.now() + HOUR); // 1 hour
      res.cookie('access_token', token, {
        httpOnly: true,
        expires: expiryDate
      });

      return responseHandler.ok(res, rest);
    }

    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

    const user_data = {
      user_name: req.body.user_name,
      user_login_name:
        req.body.user_name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-8),
      user_email: req.body.user_email,
      user_password: hashedPassword,
      user_avt_img: req.body.user_avt_img,
    }

    const user = await User.create(user_data);
    const { user_password: _, ...rest } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    const expiryDate = new Date(Date.now() + HOUR); // 1 hour
    res.cookie('access_token', token, {
      httpOnly: true,
      expires: expiryDate
    });

    return responseHandler.ok(res, rest);
  } catch (error) {
    next(error);
  }
}

export const logout = (req, res, next) => {
  console.log('Đã đăng xuất')
  res.clearCookie('access_token');

  return responseHandler.ok(res, undefined, 'Logout success');
}