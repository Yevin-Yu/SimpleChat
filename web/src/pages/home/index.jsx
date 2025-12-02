import "./index.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import List from "@/pages/list";
import Chat from "@/pages/chat";

export default function Home({ currentWs, isConnected }) {
    const selectedChat = useSelector((state) => state.chat.selectedChat);
    const [isPhone, setIsPhone] = useState(window.innerWidth <= 768);

    // 使用useEffect监听窗口大小变化，并清理事件监听器
    useEffect(() => {
        const handleResize = () => {
            setIsPhone(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        // 清理函数
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // 渲染列表和聊天窗口
    const shouldShowList = !isPhone || !selectedChat?.id;
    const shouldShowChat = !isPhone || selectedChat?.id;
    return (
        <div className="home-page">
            {shouldShowList && (
                <div className={isPhone ? "home-left home-left-phone" : "home-left"}>
                    <List currentWs={currentWs} isConnected={isConnected} />
                </div>
            )}
            {shouldShowChat && (
                <div className="home-right">
                    <Chat currentWs={currentWs} isConnected={isConnected} />
                </div>
            )}
        </div>
    );
}
