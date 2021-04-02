import { configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "./components/common/CommonSlice.js";

export default configureStore({
  reducer: {
    loading: loadingReducer
  }
});
