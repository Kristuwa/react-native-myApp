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
    console.log(data);
    try {
      createUserWithEmailAndPassword(authFirebase, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user", user);
          const { uid } = userCredential.user;
          console.log("uid", uid);

          Toast.show("Вы успешно зарегистрировались", {
            duration: 3000,
            position: 50,
          });

          thunkAPI.dispatch(
            updateProfile(authFirebase.currentUser, {
              displayName: data.login,
              userId: uid,
            })
          );
          return user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          Toast.show(errorMessage, {
            duration: 3000,
            position: 50,
          });
        });
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
      signInWithEmailAndPassword(authFirebase, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;

          Toast.show(`Выполнен вход ${user.email}`, {
            duration: 3000,
            position: 50,
          });
          return user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Toast.show(errorMessage, {
            duration: 3000,
            position: 50,
          });
        });
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const LogOut = () => {
  signOut(authFirebase)
    .then(() => {
      Toast.show("Выполнен выход из аккаунта!", {
        duration: 3000,
        position: 50,
      });
      return;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Toast.show(errorMessage, {
        duration: 3000,
        position: 50,
      });
    });
};
