import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    value: false,
  },
  reducers: {
    showLoading: state => {
      state.value = true;
    },
    hideLoading: state => {
      state.value = false;
    }
  }
});

export const { showLoading, hideLoading } = loadingSlice.actions;

export const selectLoading = state => state.loading.value;

export const loadingReducer = loadingSlice.reducer;
