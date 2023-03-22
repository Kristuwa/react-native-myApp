import { authFirebase } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-root-toast";

export const register = createAsyncThunk(
  "user/register",
  async (data, thunkAPI) => {
    console.log("data register", data);
    try {
      const response = await createUserWithEmailAndPassword(
        authFirebase,
        data.email,
        data.password
      );

      const { uid } = response.user;
      console.log("response register", response);
      Toast.show("Вы успешно зарегистрировались", {
        duration: 3000,
        position: 50,
      });

      thunkAPI.updateProfile(authFirebase.currentUser, {
        displayName: data.login,
        userId: uid,
      });

      console.log("user register", displayName, uid);
      const { user } = response;
      return user;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
      console.log(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
  async (data, thunkAPI) => {
    try {
      const response = await signInWithEmailAndPassword(
        authFirebase,
        data.email,
        data.password
      );
      const { user } = response.user;
      console.log("user login", user);
      Toast.show(`Выполнен вход ${user.email}`, {
        duration: 3000,
        position: 50,
      });

      return user;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("user/logOut", async () => {
  try {
    await signOut(authFirebase);
    Toast.show("Выполнен выход из аккаунта!", {
      duration: 3000,
      position: 50,
    });
    return;
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});
