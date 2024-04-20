import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import responseHandler from "../handlers/response.handler.js";

//bộ test
// {
//   "user_name": "newName",
//   "user_birth": "2000-05-15",
//   "user_gender": "newGender",
//   "user_email": "newEmail",
//   "user_phone": "0123456789",
//   "user_address": "newAddress"
// }


//api để test, không sử dụng trong thực tế
// export const getUserByEmail = async (req, res, next) => {
//   const { user_email } = req.body;

//   try {
//     // Find the user in the database
//     const user = await User.findOne({ user_email });

//     // Check if user exists
//     if (!user) {
//       return responseHandler.notFound(res, "User does not exist");
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     next(error);
//   }
// };
// //api để test, không sử dụng trong thực tế
// export const deleteUserByEmail = async (req, res, next) => {
//   const { user_email } = req.body;

//   try {
//     // Find the user in the database
//     const user = await User.findOne({ user_email });

//     // Check if user exists
//     if (!user) {
//       return responseHandler.notFound(res, "User does not exist");
//     }

//     // Delete the user
//     await User.deleteOne({ user_email });

//     return res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

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
  console.log("changePassword called");

  const user_id = req.user.id;
  const { oldPassword, newPassword } = req.body;

  console.log(`User ID: ${user_id}`);
  console.log(`Old Password: ${oldPassword}`);
  console.log(`New Password: ${newPassword}`);

  try {
    // Find the user in the database
    const user = await User.findById(user_id);

    console.log(`User: ${JSON.stringify(user)}`);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = bcryptjs.compareSync(oldPassword, user.user_password);

    console.log(`Password match: ${isMatch}`);

    if (!isMatch) {
      console.log("Old password is incorrect");
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    user.user_password = bcryptjs.hashSync(newPassword, 10);

    await user.save();

    console.log("Password updated successfully");
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