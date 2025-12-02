import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "sc-chat",
    initialState: {
        chatList: [],
        selectedChat: {},
        chatMessages: [],
    },
    reducers: {
        updateChatList: (state, action) => {
            state.chatList = action.payload;
        },
        updateSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        },
    },
});

export const { updateChatList, updateSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;