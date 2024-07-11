
import React from 'react';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      console.log(action.payload,23);
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    likes:(state,action)=>{
       if(!state.currentUser.likedvideos.includes(action.payload)){
        state.currentUser.likedvideos.push(action.payload);
        state.currentUser.dislikedvideos.splice(
          state.currentUser.dislikedvideos.findIndex((userid)=>userid===action.payload),1
        )
       }
    },
    dislikes:(state,action)=>{
      if(!state.currentUser.dislikedvideos.includes(action.payload)){
       state.currentUser.dislikedvideos.push(action.payload);
       state.currentUser.likedvideos.splice(
         state.currentUser.likedvideos.findIndex((userid)=>userid===action.payload),1
       )
      }
   }
    
  },
});

export const { loginStart, loginSuccess, loginFailure, logout,likes,dislikes } =
  userSlice.actions;

export default userSlice.reducer;