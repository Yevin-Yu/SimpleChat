const WebSocket = require("ws");
const { sendCurrentUsers } = require("./send.js");

function onMessage(ws, clients, message) {
    /**
     * 1. 如果 type 为 join 则加入当前连接的客户端，并且储存 客户端的 nickname id 等信息
     *    并且广播当前所有连接的nickname id信息给所有连接的客户端
     */
    const data = JSON.parse(message);
    if (data.type === "join") {
        const { nickname, id } = data.data;
        // 检查是否存在相同id的客户端 如果存，删除旧的客户端
        const hasClient = Array.from(clients).find((client) => client.id === id);
        if (hasClient) {
            clients.delete(hasClient);
        }
        clients.add(ws);
        ws.nickname = nickname;
        ws.id = id;

        sendCurrentUsers(clients);
    }
}

module.exports = { onMessage };
