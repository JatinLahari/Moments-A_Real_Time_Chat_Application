import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        onlineUsers.set(userId, socket.id);
        console.log(`User ${userId} is now online`);
        
        // Broadcast the updated list of online users
        io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
    }

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        
        // Remove user from online users when they disconnect
        for (const [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                console.log(`User ${userId} is now offline`);
                break;
            }
        }
        
        // Broadcast the updated list of online users
        io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Socket server is running!" });
});

server.listen(5000, () => {
    console.log("Test server started on port 5000");
});