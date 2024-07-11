
import React from 'react';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCompany: null,
  loading: false,
  error: false,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    companyStart: (state) => {
      state.loading = true;
    },
    companySuccess: (state, action) => {
      state.loading = false;
      state.currentCompany = action.payload;
      console.log(action.payload,23);
    },
    companyFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    companylogout: (state) => {
      state.currentCompany = null;
      state.loading = false;
      state.error = false;
    }
   
    
    
  },
});

export const { companyStart, companySuccess, companyFailure, companylogout} =
  companySlice.actions;

export default companySlice.reducer;