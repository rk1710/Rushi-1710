const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const app = express();
const server = http.createServer(app);
const io = new Server(server);


const colors = ["red", "blue", "green", "purple", "orange","pink","black"];
let currentColorIndex = 0;


const userColors = {};

io.on("connection", (socket) => {

    const userId = uuidv4();
    

    const userColor = colors[currentColorIndex];
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    userColors[userId] = userColor;
    

    socket.emit("init", { userId, userColor });


    socket.on("user-message", (data) => {

        const messageData = {
            message: data.message,
            userColor: userColors[data.userId]
        };
        io.emit("message", messageData);
    });
});

app.get("/", (req, res) => {
    const indexFilePath = path.resolve(__dirname, 'public', 'chatUI.html');
    res.sendFile(indexFilePath);
});

server.listen(9000, () => {
    console.log("Server Started at PORT: 9000");
});
