import { useRef, useEffect } from "react";
// 是否登陆
import { useSelector } from "react-redux";
// 用户数据

export function useWebSocket() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const userData = useSelector((state) => state.user.userData);

    const currentWs = useRef(null);
    useEffect(() => {
        if (!currentWs.current && isLoggedIn) {
            currentWs.current = new WebSocket("ws://localhost:8080");
            // 监听消息
            currentWs.current.onmessage = (event) => {
                console.log("收到消息:", event.data);
            };
            // 监听打开
            currentWs.current.onopen = () => {
                console.log("WebSocket 连接成功");
                currentWs.current.send(
                    JSON.stringify({
                        type: "join",
                        data: {
                            id: userData.id,
                            username: userData.username,
                        },
                    }),
                );
            };
            // 监听错误
            currentWs.current.onerror = (error) => {
                console.error("WebSocket 错误:", error);
            };
            // 监听关闭
            currentWs.current.onclose = () => {
                console.log("WebSocket 连接关闭");
            };
        }
    }, [isLoggedIn]);

    return {
        currentWs,
    };
}
