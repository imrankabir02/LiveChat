import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import { app, server, io } from "./socket/index.js";

dotenv.config();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

const PORT = process.env.PORT || 8080;


app.get("/", (req, res) => {
  res.json({
    message: "Server running at:" + PORT,
  });
});

app.use("/api", router);

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log("Server is running at:", PORT);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

export default app