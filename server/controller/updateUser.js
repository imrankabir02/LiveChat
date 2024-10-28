import { getUserToken } from "../helpers/getUserToken.js";
import UserModel from "../models/UserModel.js";

export const updateUser = async (req, res) => {
    try {
        const token = req.cookies.token || ""

        const user = await getUserToken(token)

        const {name, email, profile_pic} = req.body

        const updateUser = await UserModel.updateOne({ 
            _id : user._id
        }, {
            name,
            email,
            profile_pic
        })

        const userInfo = await UserModel.findById(user._id).select("-password")

        return res.status(200).json({
            message: "User updated successfully",
            data: userInfo
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
        });
    }
}