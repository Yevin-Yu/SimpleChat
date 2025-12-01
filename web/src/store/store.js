import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import chatReducer from "./chatSlice";

const persisted = localStorage.getItem("sc-user");
const preloadedState = {
    user: {
        isLoggedIn: !!persisted,
        userData: persisted ? JSON.parse(persisted) : null,
    },
};

export const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer,
    },
    preloadedState,
});
