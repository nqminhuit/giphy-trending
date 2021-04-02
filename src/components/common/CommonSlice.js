import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: { value: false },
  reducers: {
    toggleLoading: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { toggleLoading } = loadingSlice.actions;

export const selectLoading = state => state.loading.value;

export const loadingReducer = loadingSlice.reducer;
