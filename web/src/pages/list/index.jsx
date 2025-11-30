import { useSelector } from "react-redux";
import SimpleTag from "@/components/SimpleTag";
import "./index.css";
export default function List() {
    const userData = useSelector((state) => state.user.userData);

    return (
        <div className="list-page">
            <h1 className="list-header">
                <img src="/icon.png" alt="logo" />
                <span>Simple Chat {userData?.nickname}</span>
            </h1>
            <div className="list-content">
                <SimpleTag size="large">
                    <img src="/user.png" alt="user" />
                    <div className="user-info">
                        <p className="nickname">{userData?.nickname}</p>
                        <p className="id">{userData?.id}</p>
                    </div>
                </SimpleTag>
                <SimpleTag size="large">
                    <img src="/user.png" alt="user" />
                    <div className="user-info">
                        <p className="nickname">{userData?.nickname}</p>
                        <p className="id">{userData?.id}</p>
                    </div>
                </SimpleTag>
                <SimpleTag size="large">
                    <img src="/user.png" alt="user" />
                    <div className="user-info">
                        <p className="nickname">{userData?.nickname}</p>
                        <p className="id">{userData?.id}</p>
                    </div>
                </SimpleTag>
                <SimpleTag size="large">
                    <img src="/user.png" alt="user" />
                    <div className="user-info">
                        <p className="nickname">{userData?.nickname}</p>
                        <p className="id">{userData?.id}</p>
                    </div>
                </SimpleTag>
                <SimpleTag size="large">
                    <img src="/user.png" alt="user" />
                    <div className="user-info">
                        <p className="nickname">{userData?.nickname}</p>
                        <p className="id">{userData?.id}</p>
                    </div>
                </SimpleTag>
                <SimpleTag size="large">
                    <img src="/user.png" alt="user" />
                    <div className="user-info">
                        <p className="nickname">{userData?.nickname}</p>
                        <p className="id">{userData?.id}</p>
                    </div>
                </SimpleTag>
                <SimpleTag size="large">
                    <img src="/user.png" alt="user" />
                    <div className="user-info">
                        <p className="nickname">{userData?.nickname}</p>
                        <p className="id">{userData?.id}</p>
                    </div>
                </SimpleTag>
                <SimpleTag size="large">
                    <img src="/user.png" alt="user" />
                    <div className="user-info">
                        <p className="nickname">{userData?.nickname}</p>
                        <p className="id">{userData?.id}</p>
                    </div>
                </SimpleTag>
                <SimpleTag size="large">
                    <img src="/user.png" alt="user" />
                    <div className="user-info">
                        <p className="nickname">{userData?.nickname}</p>
                        <p className="id">{userData?.id}</p>
                    </div>
                </SimpleTag>
                <SimpleTag size="large">
                    <img src="/user.png" alt="user" />
                    <div className="user-info">
                        <p className="nickname">{userData?.nickname}</p>
                        <p className="id">{userData?.id}</p>
                    </div>
                </SimpleTag>
            </div>
        </div>
    );
}
