import { configureStore } from "@reduxjs/toolkit";
import signInModalReducer from "../slices/sign-in-slice";
import navbarReducer from "../slices/navbar-slice";

const store = configureStore({
  reducer: {
    signInModal: signInModalReducer,
    navbar: navbarReducer,
  },
});

export default store;
