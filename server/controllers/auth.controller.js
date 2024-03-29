import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import responseHandler from "../handlers/response.handler.js";
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
    const user_email = req.body.user_email
    const checkUser = await User.findOne({
        user_email
    });
    if (checkUser) return responseHandler.badrequest(res, "username already used");

    try {
        const newUser = new User({
            user_login_name: req.body.user_name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8),
            user_name: req.body.user_name,
            user_password: bcryptjs.hashSync(req.body.user_password, 10),
            user_email: req.body.user_email
        });

        await newUser.save();
        res.status(200).json({
            message: "User created successfully."
        });
    } catch (error) {
        next(error)
        // next(errorHandler(500, error.message))
        // res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res, next) => {
    const {
        user_email,
        user_password
    } = req.body

    try {
        const validUser = await User.findOne({
            user_email
        });
        if (!validUser) return responseHandler.errorHandler(res, 404, "Tài khoản không tồn tại!");
        const checkPassword = bcryptjs.compareSync(user_password, validUser.user_password);
        if (!checkPassword) return responseHandler.unauthorize(res)

        const {user_password: hashedPassword, ...rest} = validUser._doc
        const token = jwt.sign({
            id: validUser._id
        }, process.env.JWT_SECRET_KEY);

        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res.cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate
        }).status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

export const loginWithGoogle = async (req, res, next) => {
    try {
        const user = await User.findOne({user_email: req.body.email});
        if (user) {
            const {user_password: hashedPassword, ...rest} = user._doc
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res.cookie('access_token', token, {
                httpOnly: true,
                expires: expiryDate
            }).status(200).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
            const newUser = new User({
                user_name: req.body.user_name,
                user_login_name: req.body.user_name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8),
                user_email: req.body.user_email,
                user_password: hashedPassword,
                user_avt_img: req.body.user_avt_img 
            })
            await newUser.save()
            const {user_password: hashedPassword2, ...rest} = newUser._doc
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY)
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res.cookie('access_token', token, {
                httpOnly: true,
                expires: expiryDate
            }).status(200).json(rest);
        }
    } catch (error) {
        next(error)
    }
}

export const logout = (req, res, next) => {
    console.log('Đã đăng xuất')
    res.clearCookie('access_token').status(200).json('Logout success!');
}