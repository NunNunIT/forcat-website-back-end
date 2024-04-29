import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import responseHandler from "../handlers/response.handler.js";
import jwt from "jsonwebtoken";

import nodemailer from "nodemailer";
import createOTP from "../utils/createOTP.js";
import dotenv from "dotenv";

dotenv.config();

const HOUR = 3600000;

export const register = async (req, res, next) => {
  const {
    user_email,
    user_name,
    user_password
  } = req.body;
  if (!(user_email && user_name && user_password))
    return responseHandler.badRequest(res, "All input is required");

  const checkUser = await User.findOne({
    user_email
  });

  if (checkUser)
    return responseHandler.badRequest(res, "Username already used");

  const user_data = {
    user_login_name: user_name.split(" ").join("").toLowerCase() +
      Math.random().toString(36).slice(-8),
    user_name,
    user_password: bcryptjs.hashSync(user_password, 10),
    user_email,
  };

  try {
    const newUser = await User.create(user_data);
    const {
      _id: noID,
      user_password: passwordToDiscard,
      createdAt: createdAtToDiscard,
      updatedAt: updatedAtToDiscard,
      user_role: roleToDiscard,
      user_active: isActiveToDiscard,
      __v: versionToDiscard,
      ...rest
    } = newUser._doc;

    const token = jwt.sign({
      id: newUser._id,
      role: newUser.user_role
    }, process.env.JWT_SECRET_KEY);
    const expiryDate = new Date(Date.now() + HOUR); // 1 hour

    res.cookie("accessToken", token, {
      httpOnly: true, // Cookie chỉ có thể được truy cập thông qua HTTP, không thể bằng JavaScript
      expires: expiryDate, // Thiết lập thời gian hết hạn cho cookie
      sameSite: 'None',
      secure: true, // Cookie chỉ được gửi qua kênh bảo mật (HTTPS)
      domain: '.forcatshop.com',
    });

    return responseHandler.token(res, rest, token);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const {
    user_email,
    user_password
  } = req.body;

  const checkUser = await User.findOne({
    user_email
  });
  if (!checkUser)
    return responseHandler.notFound(res, "Tài khoản không tồn tại!");

  const checkPassword = bcryptjs.compareSync(
    user_password,
    checkUser.user_password
  );
  if (!checkPassword) return responseHandler.unauthorize(res);

  try {
    const {
      _id: noID,
      user_password: passwordToDiscard,
      createdAt: createdAtToDiscard,
      updatedAt: updatedAtToDiscard,
      user_role: roleToDiscard,
      user_active: isActiveToDiscard,
      __v: versionToDiscard,
      ...rest
    } = checkUser._doc;

    const token = jwt.sign({
      id: checkUser._id,
      role: checkUser.user_role
    }, process.env.JWT_SECRET_KEY);
    const expiryDate = new Date(Date.now() + HOUR); // 1 hour

    res.cookie("accessToken", token, {
      httpOnly: true, // Cookie chỉ có thể được truy cập thông qua HTTP, không thể bằng JavaScript
      expires: expiryDate, // Thiết lập thời gian hết hạn cho cookie
      sameSite: 'None',
      secure: true, // Cookie chỉ được gửi qua kênh bảo mật (HTTPS)
      domain: '.forcatshop.com',
    });

    return responseHandler.token(res, rest, token);
  } catch (error) {
    next(error);
  }
};

export const loginWithGoogle = async (req, res, next) => {
  try {
    const checkUser = await User.findOne({
      user_email: req.body.email
    });
    if (checkUser) {
      const {
        _id: noID,
        user_password: passwordToDiscard,
        createdAt: createdAtToDiscard,
        updatedAt: updatedAtToDiscard,
        user_role: roleToDiscard,
        user_active: isActiveToDiscard,
        __v: versionToDiscard,
        ...rest
      } = checkUser._doc;

      const token = jwt.sign({
        id: checkUser._id,
        role: checkUser.user_role
      }, process.env.JWT_SECRET_KEY);
      const expiryDate = new Date(Date.now() + HOUR); // 1 hour
      res.cookie("accessToken", token, {
        httpOnly: true, // Cookie chỉ có thể được truy cập thông qua HTTP, không thể bằng JavaScript
        expires: expiryDate, // Thiết lập thời gian hết hạn cho cookie
        sameSite: 'None',
        secure: true, // Cookie chỉ được gửi qua kênh bảo mật (HTTPS)
        domain: '.forcatshop.com',
      });

      return responseHandler.token(res, rest, token);
    }

    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

    const user_data = {
      user_name: req.body.user_name,
      user_login_name: req.body.user_name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-8),
      user_email: req.body.user_email,
      user_password: hashedPassword,
      user_avt_img: req.body.user_avt_img,
      provider: "google",
    };

    const user = await User.create(user_data);
    const {
      _id: noID,
      user_password: passwordToDiscard,
      createdAt: createdAtToDiscard,
      updatedAt: updatedAtToDiscard,
      user_role: roleToDiscard,
      user_active: isActiveToDiscard,
      __v: versionToDiscard,
      ...rest
    } = user._doc;


    const token = jwt.sign({
      id: user._id,
      role: user.user_role
    }, process.env.JWT_SECRET_KEY);
    const expiryDate = new Date(Date.now() + HOUR); // 1 hour
    res.cookie("accessToken", token, {
      httpOnly: true, // Cookie chỉ có thể được truy cập thông qua HTTP, không thể bằng JavaScript
      expires: expiryDate, // Thiết lập thời gian hết hạn cho cookie
      sameSite: 'None',
      secure: true, // Cookie chỉ được gửi qua kênh bảo mật (HTTPS)
      domain: '.forcatshop.com',
    });

    return responseHandler.token(res, rest, token);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  const accessToken = req.cookies.access_token;
  res.clearCookie("accessToken");
  return responseHandler.ok(res, undefined, "Logout success");
};

// Create a function to send an email
async function sendEmail(email, otp) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Mã OTP xác thực email",
    text: `Mã OTP của bạn là ${otp}`,
  };

  await transporter.sendMail(mailOptions);
}


export const forgot = async (req, res, next) => {
  const {
    user_email
  } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({
      user_email
    });

    // Check if user exists
    if (!user) {
      return responseHandler.notFound(
        res,
        "User with this email does not exist"
      );
    }

    const otp = createOTP();

    // Create a JWT with the OTP as the payload and a 60 second expiry
    const otpToken = jwt.sign({
      otp: otp
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: "60s",
    });

    // Store the OTP token in a cookie
    // res.cookie("otpToken", otpToken, { maxAge: 60 * 1000, httpOnly: true });
    res.cookie("otpToken", otpToken, {
      maxAge: 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true, //sửa lại thành true khi deploy
    });

    await sendEmail(user_email, otp);

    return responseHandler.ok(res, null, "OTP sent successfully");
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const {
    newPassword,
    user_email
  } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({
      user_email
    });

    // Check if user exists
    if (!user) {
      return responseHandler.notFound(res, "User does not exist");
    }

    // Hash the new password and update the user's password
    user.user_password = bcryptjs.hashSync(newPassword, 10);

    await user.save();

    return responseHandler.ok(res, null, "Password updated successfully");
  } catch (error) {
    next(error);
  }
};