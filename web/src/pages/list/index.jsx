import { useSelector } from "react-redux";
import SimpleTag from "@/components/SimpleTag";
import "./index.css";
export default function List({ currentWs }) {
    const userData = useSelector((state) => state.user.userData);
    const chatList = useSelector((state) => state.chat.chatList);

    console.log(currentWs.current);
    // 渲染聊天列表
    const renderChatList = () => {
        // 排除自己
        if (chatList.length === 0) {
            return (
                <SimpleTag className="no-chat" size="medium">
                    暂无在线用户
                </SimpleTag>
            )
        }
        return chatList.map((item) => (
            <SimpleTag key={item.id} size="large">
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
                <span>Simple Chat</span>
                <span className="nickname">{userData?.nickname}</span>
                <span className="ws-status">
                    {currentWs.current ? "已连接" : "未连接"}
                </span>
            </h1>
            <div className="list-content">
                {renderChatList()}
            </div>
        </div>
    );
}
