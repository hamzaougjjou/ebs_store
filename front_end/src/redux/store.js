// store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import cartSlice from './reducers/cartSlice';
import categoriesSlice from './reducers/categoriesSlice';
import likesSlice from './reducers/likesSlice';

const store = configureStore({
  reducer: {
    cart: cartSlice, // Add your cart slice to the store
    auth: authSlice, 
    categories: categoriesSlice,
    likes: likesSlice,
  },
});

export default store;
