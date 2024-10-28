import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js'

export const getUserToken = async (token) => {
    if(!token) {
        return {
            message: "Session out",
            logout: true
        }
    }

    const decodeToken = await jwt.verify(token, process.env.JWT_SECRET_KEY)

    const user = await UserModel.findById(decodeToken.id).select("-password")

    return user
}