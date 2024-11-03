import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from 'dotenv';  // Changed this line

dotenv.config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('connected user', socket.id);

    socket.on('disconnect', () => {
        console.log('disconnected user', socket.id);
    });
});

export { app, server, io };


// // Store active users
// const activeUsers = new Map();

// // Socket.IO event handlers
// io.on("connection", (socket) => {
//   console.log("🟢 User connected:", socket.id);

//   // Handle user joining
//   socket.on("user:join", (userId) => {
//     activeUsers.set(userId, socket.id);
//     io.emit("user:active", Array.from(activeUsers.keys()));
//   });

//   // Handle private messages
//   socket.on("message:private", ({ to, message }) => {
//     const receiverSocket = activeUsers.get(to);
//     if (receiverSocket) {
//       io.to(receiverSocket).emit("message:receive", {
//         from: socket.id,
//         message,
//       });
//     }
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log("🔴 User disconnected:", socket.id);
//     // Remove user from active users
//     for (const [userId, socketId] of activeUsers.entries()) {
//       if (socketId === socket.id) {
//         activeUsers.delete(userId);
//         break;
//       }
//     }
//     io.emit("user:active", Array.from(activeUsers.keys()));
//   });

//   // Handle errors
//   socket.on("error", (error) => {
//     console.error("Socket error:", error);
//   });
// });

// // Error handling for the server
// server.on("error", (error) => {
//   console.error("Server error:", error);
// });

// export { app, server, io };