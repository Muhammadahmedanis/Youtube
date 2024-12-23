import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: 0,
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: () => {
            return initialState;
        },
        subscription: (state, action) => {
            if (state.currentUser?.subscribedUsers?.includes(action.payload)) {
                state.currentUser?.subscribedUsers?.splice(state.currentUser?.subscribedUsers?.findIndex( (channelId) => channelId === action.payload),1)
            }else{
                state.currentUser?.subscribedUsers?.push(action.payload);   
            }
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription } = userSlice.actions; // Correctly access actions
export default userSlice.reducer; // Correctly export the reducer
