import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    fetchOut: (state) => {
      state.currentVideo = null;
      state.loading = false;
      state.error = false;
    },
    
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, fetchOut } =
  videoSlice.actions;

export default videoSlice.reducer;