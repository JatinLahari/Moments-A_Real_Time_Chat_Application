import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"
import messageRouter from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import{chat, server} from "./lib/socket.js";
dotenv.config();

chat.use(express.json());
chat.use(cookieParser());
chat.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

chat.use("/user", userRouter);
chat.use("/message", messageRouter);
server.listen(process.env.PORT,()=>{
    console.log("Server Started...");
    connectDB();
});