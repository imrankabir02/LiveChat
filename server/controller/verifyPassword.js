import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export const verifyPassword = async (req, res) => {
    try {
        const { password, userId } = req.body;

        const user = await UserModel.findById(userId)

        const verify = await bcrypt.compare(password, user.password);

        if (!verify) {
            return res.status(400).json({
                message: "Please check your password",
                error: true,
            });
        }

        const tokenData = {
            id: user._id,
            email: user.email,
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d",
        });

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        };

        return res.cookie('token',token,cookieOptions).status(200).json({
            message: "Login successful",
            token : token,
            success : true
        })
        
    } catch (error) {
        return res.status(500).json({
        message: error.message || error,
        error: true,
        });
    }
};
