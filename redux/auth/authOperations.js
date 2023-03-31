import { authFirebase } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Toast from "react-native-root-toast";
import { authSlice } from "./authReducer";

const { authSignOut, updateUserProfile, authStateChange } = authSlice.actions;

export const register =
  ({ email, password, login, avatar }) =>
  async (dispatch, getState) => {
    try {
      const response = await createUserWithEmailAndPassword(
        authFirebase,
        email,
        password
      );

      const user = response.user;

      Toast.show("Вы успешно зарегистрировались", {
        duration: 3000,
        position: 50,
      });

      await updateProfile(authFirebase.currentUser, {
        displayName: login,
        userId: user.uid,
        photoURL: avatar,
      });

      const { displayName, uid, photoURL } = await authFirebase.currentUser;

      const userUpdateProfile = {
        userName: displayName,
        userId: uid,
        userAvatar: photoURL,
        userEmail: email,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const signIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(
        authFirebase,
        email,
        password
      );

      const { displayName, uid, photoURL } = user.user;

      const userUpdateProfile = {
        userName: displayName,
        userId: uid,
        userAvatar: photoURL,
        userEmail: email,
      };

      dispatch(updateUserProfile(userUpdateProfile));

      Toast.show(`Выполнен вход!!`, {
        duration: 3000,
        position: 50,
      });
    } catch (error) {
      console.log("error", error);
      console.log("error.code", error.code);
      console.log("error.message", error.message);
    }
  };

export const logOut = () => async (dispatch, getState) => {
  try {
    await signOut(authFirebase);
    dispatch(authSignOut());

    Toast.show("Выполнен выход из аккаунта!", {
      duration: 3000,
      position: 50,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteAvatar = () => async (dispatch, getState) => {
  try {
    await updateProfile(authFirebase.currentUser, {
      displayName: login,
      userId: user.uid,
      photoURL: null,
    });

    const userUpdateProfile = {
      userName: displayName,
      userId: uid,
      userAvatar: photoURL,
      userEmail: email,
    };

    dispatch(updateUserProfile(userUpdateProfile));

    Toast.show(`Аватар удален!!`, {
      duration: 3000,
      position: 50,
    });
  } catch (error) {
    console.log("error", error);
    console.log("error.code", error.code);
    console.log("error.message", error.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(authFirebase, (user) => {
    if (user) {
      const userUpdateProfile = {
        userName: user.displayName,
        userId: user.uid,
        userAvatar: user.photoURL,
        userEmail: user.email,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};
