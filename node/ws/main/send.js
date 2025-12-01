const WebSocket = require("ws");

// 发送当前链接设备  给所有连接的客户端 
const sendCurrentUsers = (clients) => {
    const chatList = Array.from(clients).map((client) => ({
        nickname: client.nickname,
        id: client.id,
    }));
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(
                JSON.stringify({
                    type: "chatList",
                    data: chatList,
                }),
            );
        }
    });
};

module.exports = {
    sendCurrentUsers,
}