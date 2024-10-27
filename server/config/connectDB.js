import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        const connection = mongoose.connection

        connection.on('connected', ()=> {
            console.log("Connected to MongoDB");
        })
        connection.on('error', ()=>{
            console.log("Something is wrong while connecting mongo", error);
        })
    } catch (error) {
        console.log("Something is wrong with mongo", error);
    }
}

export default connectDB