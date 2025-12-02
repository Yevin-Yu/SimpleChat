import "./index.css";
import { useSelector } from "react-redux";
import SimpleTag from "@/components/SimpleTag";

export default function Chat() {
    const selectedChat = useSelector((state) => state.chat.selectedChat);

    if (!selectedChat?.id) {
        return (
            <div className="chat-page">
                <SimpleTag size="large" className="empty-tag">
                    <img className="empty-img" src="/empty.png" alt="empty" />
                </SimpleTag>
                <span className="empty-text">点击左侧用户列表开始聊天</span>
            </div>
        );
    }
    return (
        <div className="chat-page">
            <div className="chat-header">
                <h1>{selectedChat?.nickname}</h1>
            </div>
        </div>
    );
}
