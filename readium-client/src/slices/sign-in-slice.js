import { createSlice } from "@reduxjs/toolkit";

const initialState = false;
const signInModalSlice = createSlice({
  initialState,
  name: "signInModal",
  reducers: {
    modalOpened: () => true,
    modalClosed: () => false,
  },
});

export const { modalOpened, modalClosed } = signInModalSlice.actions;
export default signInModalSlice.reducer;
