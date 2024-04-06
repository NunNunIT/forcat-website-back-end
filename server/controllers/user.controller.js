import User from "../models/user.model.js";
import bcrypt from "bcrypt";


// const fakeUser = new User({
//   user_name: "Old Name",
//   user_birth: new Date("1990-01-01"),
//   user_gender: "Male",
//   user_email: "oldemail@example.com",
//   user_password: "oldpassword",
//   user_phone: "1234567890",
//   user_address: "Old Address",
// });

// await fakeUser.save();

export const edit = async (req, res) => {
  const {
    user_name,
    user_birth,
    user_gender,
    user_email,
    user_phone,
    user_address,
  } = req.body;

  try {
    const user = await User.findByEmail(req.body.email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.user_name = user_name;
    user.user_birth = user_birth;
    user.user_gender = user_gender;
    user.user_email = user_email;
    user.user_phone = user_phone;
    user.user_address = user_address;

    await user.save();

    res.json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findByEmail(req.body.email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.user_password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    user.user_password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating password", error });
  }
};