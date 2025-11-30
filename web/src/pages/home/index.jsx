import "./index.css";
import { useState } from "react";
import List from "@/pages/list";
import Chat from "@/pages/chat";

export default function Home() {
    const [isPhone, setIsPhone] = useState(window.innerWidth <= 768);
    // 实时监听 窗口宽度变化
    window.addEventListener("resize", () => {
        setIsPhone(window.innerWidth <= 768);
    });

    return (
        <div className="home-page">
            <div className={isPhone ? "home-left home-left-phone" : "home-left"}>
                <List />
            </div>
            {!isPhone && (
                <div className="home-right">
                    <Chat />
                </div>
            )}
        </div>
    );
}
