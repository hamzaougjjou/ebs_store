// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// let cartLocal =  localStorage.getItem("cart") ;
let isLoggedIn = sessionStorage.getItem("isLogedIn")

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user:{},
        token:null,
        logedIn: isLoggedIn==null ? false : isLoggedIn
    } ,
    reducers: {
        addAuth: (state, action) => {
            state = {
                user:action.payload.user,
                token:action.payload.token,
                logedIn:true
            }
            return state;
        },

        logOut: ( state ) => {
            state = {
                user:{},
                token:null,
                logedIn:false
            }
            return state;
        },
       
    },
});


export const { addAuth , logOut } = authSlice.actions;
export default authSlice.reducer;
