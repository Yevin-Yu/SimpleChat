import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const persisted = localStorage.getItem("user");
const preloadedState = {
    user: {
        isLoggedIn: !!persisted,
        userData: persisted ? JSON.parse(persisted) : null,
    },
};

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState,
});
