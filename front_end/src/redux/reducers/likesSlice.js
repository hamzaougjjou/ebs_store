// likesSlice.js
import { createSlice } from '@reduxjs/toolkit';

let likesLocal = localStorage.getItem("likes");

const likesSlice = createSlice({
    name: 'likes',
    initialState: likesLocal == null ? [] : JSON.parse(likesLocal),
    reducers: {
        addToLikes: (state, action) => {
            state.push(action.payload);
            console.log("+++++++++++++++++++++++++++++++++++");
            console.log(state);
            localStorage.setItem("likes", JSON.stringify(state));
        },
        removeFromLikes: (state, action) => {
            let newList = state.filter(item => item.id !== action.payload.id);
            localStorage.setItem("likes", JSON.stringify(newList));
            return newList;
        },
    },
});

export const { addToLikes, removeFromLikes } = likesSlice.actions;
export default likesSlice.reducer;
