const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

const { onMessage } = require("./main/message.js");
const { onClose } = require("./main/close.js");

// 存储当前连接的客户端
const clients = new Set();

// 监听连接事件
wss.on("connection", (ws) => {
    // 监听消息事件
    ws.on("message", (message) => {
        onMessage(ws, clients, message);
    });
    // 监听关闭事件
    ws.on("close", () => {
        onClose(ws, clients);
    });
});

console.log("WebSocket server started on port 8080");
