import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/userSlice";

import SimpleInput from "@/components/SimpleInput";
import SimpleButton from "@/components/SimpleButton";
import "./index.css";

import { useMessage } from "@/hooks/useMessage";

export default function Login() {
    const { showMessage } = useMessage();
    const dispatch = useDispatch();

    const [nickname, setNickname] = useState("");
    const [placeholder, setPlaceholder] = useState("请输入您的昵称");

    const handleLogin = () => {
        if (nickname.trim() === "") {
            showMessage("请输入您的昵称");
            return;
        }
        const userData = {
            id: Math.random().toString(36).substring(2).toUpperCase(),
            nickname,
            createdAt: Date.now(),
        };
        dispatch(login(userData));
        showMessage("登录成功");
    };
    return (
        <div className="login-page">
            <h1 className="login-title">Simple Chat</h1>
            <SimpleInput
                size="large"
                onFocus={() => setPlaceholder("")}
                onBlur={() => setPlaceholder("请输入您的昵称")}
                onChange={(e) => setNickname(e.target.value)}
                label="昵称"
                type="text"
                placeholder={placeholder}
            />
            <SimpleButton className="login-button" size="medium" onClick={handleLogin}>
                🚀
            </SimpleButton>
        </div>
    );
}
