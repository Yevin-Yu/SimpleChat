import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "@/pages/login";
import Home from "@/pages/home";

export default function App() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    // 未登录 跳转登录页
    if (!isLoggedIn) {
        return (
            <Router>
                <Login />
            </Router>
        );
    }
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}
