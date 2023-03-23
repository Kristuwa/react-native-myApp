import { createSlice } from "@reduxjs/toolkit";
import { logOut, register, signIn } from "./authOperations";

const initialState = {
  userId: "",
  userName: "",
  userEmail: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        console.log("register", action);
        return {
          ...state,
          userId: action.payload.uid,
          userName: action.payload.displayName,
          userEmail: action.payload.email,
        };
      })
      .addCase(signIn.fulfilled, (state, action) => {
        console.log("login", action);
        console.log(state);
        return {
          ...state,
          userId: action.payload.uid,
          userName: action.payload.displayName,
          userEmail: action.payload.email,
        };
      })
      .addCase(logOut.fulfilled, (state) => {
        return { ...state, userId: "", userName: "" };
      });
  },
});

export const authReducer = authSlice.reducer;
