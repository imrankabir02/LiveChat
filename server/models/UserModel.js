import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Name required"]
    },
    email : {
        type: String,
        required: [true, "Email required"],
        unique: true
    },
    password : {
        type: String,
        required: [true, "Password required"]
    },
    profile_pic : {
        type: String,
        default: ""
    }
},{
    timestamps : true
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel