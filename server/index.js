import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import { app, server, io } from "./socket/index.js";

dotenv.config();

// const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.use(cookieParser());

const PORT = process.env.PORT || 8080;

// app.get("/", (req, res) => {
//   res.json({
//     message: "Server running at:" + PORT,
//   });
// });

app.use("/api", router);

// connectDB()
//   .then(() => {
//     server.listen(PORT, () => {
//       console.log("Server is running at:", PORT);
//     });
//   })
//   .catch((error) => {
//     console.error("Failed to connect to the database:", error);
//   });

// Start server
const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port: ${PORT}`);
      console.log(`📡 Socket.IO is ready for connections`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
  // Close server & exit process
  server.close(() => process.exit(1));
});
