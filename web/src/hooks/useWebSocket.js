import { useRef, useEffect, useState } from "react";
// 是否登陆
import { useSelector, useDispatch } from "react-redux";
import { updateChatList } from "../store/chatSlice";

// 用户数据

export function useWebSocket() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const userData = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();

    const currentWs = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        if (!currentWs.current && isLoggedIn) {
            currentWs.current = new WebSocket("ws://localhost:8080");
            // 监听消息
            currentWs.current.onmessage = (event) => {
                console.log("收到消息:", event.data);
                const data = JSON.parse(event.data);
                if (data.type === "chatList") {
                    dispatch(updateChatList(data.data.filter((item) => item.id !== userData.id)));
                }
            };
            // 监听打开
            currentWs.current.onopen = () => {
                setIsConnected(true);
                console.log("WebSocket 连接成功");
                currentWs.current.send(
                    JSON.stringify({
                        type: "join",
                        data: {
                            id: userData.id,
                            nickname: userData.nickname,
                        },
                    }),
                );
            };
            // 监听错误
            currentWs.current.onerror = (error) => {
                setIsConnected(false);
                console.error("WebSocket 错误:", error);
            };
            // 监听关闭
            currentWs.current.onclose = () => {
                setIsConnected(false);
                console.log("WebSocket 连接关闭");
            };
        }
    }, [isLoggedIn]);

    return {
        currentWs,
    };
}
