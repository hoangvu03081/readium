import { configureStore } from "@reduxjs/toolkit";
import signInModalReducer from "../slices/sign-in-slice";

const store = configureStore({
  reducer: {
    signInModal: signInModalReducer,
  },
});

export default store;
