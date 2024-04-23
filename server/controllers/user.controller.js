import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import responseHandler from "../handlers/response.handler.js";

export const edit = async (req, res, next) => {
  const user_id = req.user.id;
  const { user_name, user_birth, user_gender, user_phone, user_address} =
    req.body;

  try {

    // Find the user in the database and update their details
    const user = await User.findByIdAndUpdate(user_id, req.body, { new: true });

    if (!user) {
      return responseHandler.notFound(res, "User does found");
    }

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  const user_id = req.user.id;
  const { oldPassword, newPassword } = req.body;

  try {
    // Find the user in the database
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = bcryptjs.compareSync(oldPassword, user.user_password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    user.user_password = bcryptjs.hashSync(newPassword, 10);

    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(`Error: ${error}`);
    next(error);
  }
};

export const getInfoUser = async (req, res, next) => {
  const user_id = req.user.id;

  try {
    // Find the user in the database
    const user = await User.findById(user_id);

    // Check if user exists
    if (!user) {
      return responseHandler.notFound(res, "User does not exist");
    }

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};