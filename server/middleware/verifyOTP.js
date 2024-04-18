import User from "../models/user.model.js";
import responseHandler from "../handlers/response.handler.js";
import moment from "moment";
import jwt from "jsonwebtoken";


export const verifyOtp = async (req, res, next) => {
  const { user_email, otp } = req.body;

  try {
    const otpToken = req.cookies.otpToken;
    // console.log("OTP Cookies", otpToken)

    if (!otpToken) {
      return responseHandler.badRequest(res, "No OTP token found");
    }

    // Decode the stored OTP token
    const decoded = jwt.verify(otpToken, process.env.JWT_SECRET_KEY);

    if (otp !== decoded.otp) {
      return responseHandler.badRequest(res, "Invalid or expired OTP");
    }

    // OTP is valid, clear it
    res.clearCookie("otpToken");

    return responseHandler.ok(res, null, "OTP verified successfully");
  } catch (error) {
    next(error);
  }
};