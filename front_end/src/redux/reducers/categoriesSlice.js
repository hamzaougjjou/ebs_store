
// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
    name: 'cartegories',
    initialState: {
        categories:[],
        loading:false,
        error: false
    } ,
    reducers: {
        
        startGetCategories: (state) => {
            state.loading = true;
            state.error = false;
        },
        getCategories: (state, action) => {
            console.log(action.payload);
            state.categories = action.payload;
            state.loading = false;
            state.error = false;
        },
        getCategoriesError: (state) => {
            state.error = true;
            state.loading = false;
        },

    },
});


export const { startGetCategories , getCategories,getCategoriesError} = categoriesSlice.actions;
export default categoriesSlice.reducer;
