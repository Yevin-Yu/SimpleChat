const WebSocket = require("ws");
const { sendCurrentUsers } = require("./send.js");

function onClose(ws, clients) {
    console.log(ws.nickname, ws.id, "关闭连接");
    clients.delete(ws);
    sendCurrentUsers(clients);
}

module.exports = { onClose };
