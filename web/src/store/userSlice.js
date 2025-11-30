import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "sc-user",
    initialState: {
        isLoggedIn: false,
        userData: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload;
            localStorage.setItem("sc-user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userData = null;
            localStorage.removeItem("sc-user");
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
