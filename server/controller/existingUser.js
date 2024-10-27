import UserModel from "../models/UserModel.js";

export const existingUser = async (req, res) => {
    try {
        const { email } = req.body;

        const existingUser = await UserModel.findOne({email}).select("-password")

        if(!existingUser) {
            return res.status(400).json({
                message: "User doesn't exist",
                error: true
            })
        }

        return res.status(200).json({
            message: "Email verification",
            success: true,
            data: existingUser
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}