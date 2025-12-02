import { useSelector, useDispatch } from "react-redux";
import { updateSelectedChat } from "@/store/chatSlice";

import SimpleTag from "@/components/SimpleTag";
import "./index.css";
export default function List({ currentWs }) {
    const userData = useSelector((state) => state.user.userData);
    const chatList = useSelector((state) => state.chat.chatList);
    const selectedChat = useSelector((state) => state.chat.selectedChat);
    const dispatch = useDispatch();
    // 渲染聊天列表
    const renderChatList = () => {
        // 排除自己
        if (chatList.length === 0) {
            return (
                <SimpleTag className="no-chat" size="medium">
                    暂无在线用户
                </SimpleTag>
            );
        }
        return chatList.map((item) => (
            <SimpleTag key={item.id} className={item.id === selectedChat?.id ? "selected" : ""} size="large" onClick={() => dispatch(updateSelectedChat(item))}>
                <img src="/user.png" alt="user" />
                <div className="user-info">
                    <p className="nickname">{item.nickname}</p>
                    <p className="id">{item.id}</p>
                </div>
            </SimpleTag>
        ));
    };

    return (
        <div className="list-page">
            <h1 className="list-header">
                <img src="/icon.png" alt="logo" />
                <span>SimpleChat</span>
                <span className="nickname">{userData?.nickname}</span>
                <span className="ws-status">{currentWs.current?.readyState === 1 ? "已连接🔗" : "未连接❌"}</span>
            </h1>
            <div className="list-content">{renderChatList()}</div>
        </div>
    );
}
