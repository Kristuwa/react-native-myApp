import { createSlice } from "@reduxjs/toolkit";
import { register, signIn } from "./authOperation";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    userName: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) =>
        console.log(action.payload)({
          ...state,
          userId: action.payload.uid,
        })
      )
      .addCase(register.fulfilled, (state, action) =>
        console.log(action.payload)({
          ...state,
          userId: action.payload.uid,
          userName: action.payload.displayName,
        })
      );
  },
});
