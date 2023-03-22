import { createSlice } from "@reduxjs/toolkit";
import { logOut, register, signIn } from "./authOperations";

const initialState = {
  userId: "",
  userName: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        console.log("register", payload);
        return {
          ...state,
          userId: payload.uid,
          userName: payload.displayName,
        };
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        console.log("login", payload);
        return {
          ...state,
          userId: payload.uid,
        };
      })
      .addCase(logOut.fulfilled, (state) => {
        return { ...state, userId: "", userName: "" };
      });
  },
});

export const authReducer = authSlice.reducer;
