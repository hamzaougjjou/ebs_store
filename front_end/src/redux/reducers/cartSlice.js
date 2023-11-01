// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

let cartLocal =  localStorage.getItem("cart") ;

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartLocal==null ? [] : JSON.parse( cartLocal ) ,
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(state));
        },
        removeFromCart: (state, action) => {
            let newList = state.filter(item => item.id !== action.payload.id);
            localStorage.setItem("cart", JSON.stringify(newList));
            return newList;
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
