import { useRef, useEffect } from "react";
let timerId = null;
export function useMessage() {
    const messageEl = useRef(null);

    const clearMessage = () => {
        const oldMessages = document.querySelectorAll(".sh-message-default");
        oldMessages.forEach((el) => el.parentNode && el.parentNode.removeChild(el));

        if (messageEl.current && messageEl.current.parentNode) {
            messageEl.current.parentNode.removeChild(messageEl.current);
            messageEl.current = null;
        }

        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }
    };

    const showMessage = (msg) => {
        clearMessage();

        const el = document.createElement("div");
        el.className = "sh-message-default";
        el.textContent = "🔔 " + msg;
        document.body.appendChild(el);

        messageEl.current = el;

        timerId = setTimeout(() => {
            clearMessage();
        }, 3000);
    };

    // 组件卸载时自动清理
    useEffect(() => {
        return () => {
            clearMessage();
        };
    }, []);

    return { showMessage, clearMessage };
}
