import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "sc-chat",
    initialState: {
        chatList: [],
    },
    reducers: {
        updateChatList: (state, action) => {
            state.chatList = action.payload;
        },
    },
});

export const { updateChatList } = chatSlice.actions;
export default chatSlice.reducer;