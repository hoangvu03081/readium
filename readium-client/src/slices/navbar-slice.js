import { createSlice } from "@reduxjs/toolkit";

const initialState = false;
const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    avatarClicked: () => true,
    navClosed: () => false,
  },
});

export const { avatarClicked, navClosed } = navbarSlice.actions;
export default navbarSlice.reducer;
