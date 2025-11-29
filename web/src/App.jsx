import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "@/pages/login";

const Home = () => {
    return <h1>Home</h1>;
};
const About = () => {
    return <h1>About</h1>;
};
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
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}
