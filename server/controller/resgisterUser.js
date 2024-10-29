import UserModel from '../models/UserModel.js'
import bcrypt from 'bcryptjs'

export const registerUser = async (req, res) => {
    try {
        const {name, email, password, profile_pic} = req.body

        const existingUser = await UserModel.findOne({ email })

        if(existingUser) {
            return res.status(400).json({
                message: "User already exists",
                error: true
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const payload = {
            name,
            email,
            profile_pic,
            password: hashedPassword
        }

        const newUser = new UserModel(payload)

        const saveUser = await newUser.save()

        let data = await UserModel.findById(saveUser._id).select('-password')

        return res.status(201).json({
            message: "User created successfully",
            data: data,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error" + error.message || error,
            error : true
        })
    }
}