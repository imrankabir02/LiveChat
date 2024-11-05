import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv';  // Changed this line

dotenv.config();

const app = express();
const server = createServer(app);

console.log("Frontend URL:", process.env.FRONTEND_URL);

const io = new Server(server,{
    cors : {
        origin : process.env.FRONTEND_URL,
        credentials : true
    }
})

//online user
const onlineUser = new Set()

io.on('connection',async(socket)=>{
    console.log("Connected User ", socket.id)

    const token = socket.handshake.auth.token 

    //current user details 
    const user = await getUserToken(token)

    // Create a room for the user
    if (user && user._id) {
        socket.join(user._id.toString());
        onlineUser.add(user._id.toString());

        // Emit the list of online users
        io.emit('onlineUser', Array.from(onlineUser));
    }

    // Handle user disconnection
    socket.on('disconnect', () => {
        onlineUser.delete(user?._id?.toString());
        console.log("Disconnected user:", socket.id);
    });
})



export { app, server, io };