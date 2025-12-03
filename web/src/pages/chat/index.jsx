import "./index.css";
import { useSelector } from "react-redux";
import SimpleTag from "@/components/SimpleTag";
import { useState, useRef, useEffect } from "react";

// 模拟聊天消息数据
const mockMessages = [
    {
        id: 1,
        sender: "other",
        name: "Alice",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
        content: "你好！今天过得怎么样？",
        time: "10:30",
        date: "今天",
        isRead: true,
    },
    {
        id: 2,
        sender: "me",
        name: "我",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Me",
        content: "还不错！刚刚完成了一个项目。你呢？",
        time: "10:32",
        date: "今天",
        isRead: true,
    },
    {
        id: 3,
        sender: "other",
        name: "Alice",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
        content: "我也很好！周末有什么计划吗？",
        time: "10:33",
        date: "今天",
        isRead: true,
    },
    {
        id: 4,
        sender: "me",
        name: "我",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Me",
        content: "可能会去看电影，你有什么推荐的吗？",
        time: "10:35",
        date: "今天",
        isRead: true,
    },
    {
        id: 5,
        sender: "other",
        name: "Alice",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
        content: "最近上映的《星际穿越》很不错！",
        time: "10:36",
        date: "今天",
        isRead: true,
    },
    {
        id: 6,
        sender: "me",
        name: "我",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Me",
        content: "听起来不错！我查一下排片时间。",
        time: "10:37",
        date: "今天",
        isRead: false,
    },
    {
        id: 7,
        sender: "other",
        name: "Alice",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
        content: "好的，看完告诉我感想！😊",
        time: "10:38",
        date: "今天",
        isRead: false,
    },
];

export default function Chat() {
    const selectedChat = useSelector((state) => state.chat.selectedChat);
    const [messages, setMessages] = useState(mockMessages);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // 模拟选中的聊天
    const currentChat = selectedChat?.id
        ? selectedChat
        : {
              id: 1,
              nickname: "Alice",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
              status: "在线",
              lastSeen: "刚刚",
          };

    // 滚动到底部
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // 发送消息
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const newMsg = {
            id: messages.length + 1,
            sender: "me",
            name: "我",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Me",
            content: newMessage,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            date: "今天",
            isRead: false,
        };

        setMessages([...messages, newMsg]);
        setNewMessage("");

        // 模拟对方回复
        setTimeout(() => {
            const replyMsg = {
                id: messages.length + 2,
                sender: "other",
                name: currentChat.nickname,
                avatar: currentChat.avatar,
                content: `收到你的消息："${newMessage}"`,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                date: "今天",
                isRead: false,
            };
            setMessages((prev) => [...prev, replyMsg]);
        }, 1000);
    };

    // 处理输入框按键
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    if (!selectedChat?.id) {
        return (
            <div className="chat-page-empty">
                <SimpleTag size="large" className="empty-tag">
                    <img className="empty-img" src="/empty.png" alt="empty" />
                </SimpleTag>
                <span className="empty-text">点击左侧用户列表开始聊天</span>
            </div>
        );
    }

    return (
        <div className="chat-page">
            {/* 聊天头部 */}
            <div className="chat-header">
                <div className="chat-header-info">
                    <img src={currentChat.avatar} alt={currentChat.nickname} className="chat-avatar" />
                    <div className="chat-header-text">
                        <h2 className="chat-title">{currentChat.nickname}</h2>
                        <span className="chat-status">{currentChat.status === "在线" ? "🟢 在线" : `最后上线 ${currentChat.lastSeen}`}</span>
                    </div>
                </div>
                <div className="chat-header-actions">
                    <button className="chat-action-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                    <button className="chat-action-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                    <button className="chat-action-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* 聊天消息区域 */}
            <div className="chat-messages">
                <div className="chat-date-divider">
                    <span>今天</span>
                </div>

                {messages.map((message) => (
                    <div key={message.id} className={`message ${message.sender === "me" ? "message-out" : "message-in"}`}>
                        {message.sender === "other" && <img src={message.avatar} alt={message.name} className="message-avatar" />}
                        <div className="message-content">
                            {message.sender === "other" && <span className="message-sender">{message.name}</span>}
                            <div className="message-bubble">
                                <p className="message-text">{message.content}</p>
                                <div className="message-meta">
                                    <span className="message-time">{message.time}</span>
                                    {message.sender === "me" && <span className="message-status">{message.isRead ? "✓✓" : "✓"}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* 消息输入区域 */}
            <div className="chat-input-container">
                <div className="chat-input-actions">
                    <button className="input-action-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                                fill="currentColor"
                            />
                            <path d="M11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" fill="currentColor" />
                        </svg>
                    </button>
                    <button className="input-action-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H19V11Z" fill="currentColor" />
                        </svg>
                    </button>
                </div>

                <form className="chat-input-form" onSubmit={handleSendMessage}>
                    <div className="chat-input-wrapper">
                        <textarea
                            ref={inputRef}
                            className="chat-input"
                            placeholder="输入消息..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            rows="1"
                        />
                        <div className="input-attachments">
                            <button type="button" className="attachment-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59723 22.0024 8.005 22C6.41277 22.0024 4.88584 21.3658 3.76 20.24C2.63416 19.1142 1.99756 17.5872 2 15.995C2.00244 14.4028 2.63916 12.8758 3.765 11.75L12.755 2.76C13.5536 1.96143 14.6638 1.54285 15.8125 1.61006C16.9612 1.67727 18.0221 2.22329 18.73 3.115C19.4379 4.00671 19.725 5.15631 19.52 6.2775C19.315 7.39869 18.6378 8.38114 17.655 9L8.665 17.99C8.18851 18.4665 7.52485 18.716 6.8375 18.675C6.15015 18.634 5.51657 18.3068 5.1 17.775C4.68343 17.2432 4.52485 16.5602 4.665 15.9025C4.80515 15.2448 5.23151 14.6775 5.835 14.335L14.835 5.335"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <button type="button" className="attachment-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="send-button" disabled={!newMessage.trim()}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}
