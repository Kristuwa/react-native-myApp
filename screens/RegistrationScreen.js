import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({
  keyboardHide,
  isShowKeyboard,
  onFocus,
}) {
  const [state, setState] = useState(initialState);
  const { login, email, password } = state;

  const keyboardHideSubmitForm = () => {
    keyboardHide();
    setState(initialState);
    console.log(state);
  };

  return (
    <View
      style={{
        ...styles.form,
        paddingBottom: isShowKeyboard ? 0 : 66,
      }}
    >
      <View style={styles.userImage}>
        <TouchableOpacity style={styles.btnAdd}>
          <AntDesign name="pluscircleo" size={24} color={"#FF6C00"} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Регистрация</Text>

      <View
        style={{
          ...styles.formContainer,
          marginBottom: isShowKeyboard ? 32 : 43,
        }}
      >
        <TextInput
          style={styles.input}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, login: value }))
          }
          value={login}
          placeholder="Логин"
          onFocus={onFocus}
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, email: value }))
          }
          value={email}
          placeholder="Адрес электронной почты"
          onFocus={onFocus}
        />

        <TextInput
          style={{ ...styles.input, marginBottom: 0 }}
          onChangeText={(value) =>
            setState((prevState) => ({
              ...prevState,
              password: value,
            }))
          }
          value={password}
          placeholder="Пароль"
          secureTextEntry={true}
          onFocus={onFocus}
        />
      </View>
      <View style={{ display: isShowKeyboard ? "none" : "flex" }}>
        <TouchableOpacity style={styles.btn} onPress={keyboardHideSubmitForm}>
          <Text style={styles.btnTitle}>Зарегистрироваться</Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}>Уже есть аккаунт? Войти</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userImage: {
    position: "absolute",
    top: -60,
    right: Dimensions.get("window").width / 2 - 60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  btnAdd: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    maxWidth: 25,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    //  lineHeight: "1.17",
    marginBottom: 33,
    textAlign: "center",
  },

  form: {
    position: "relative",
    width: "100%",
    paddingTop: 92,
    marginTop: "auto",
    backgroundColor: "#ffffff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  formContainer: {
    justifyContent: "flex-end",
  },
  input: {
    borderWidth: 1,
    padding: 16,
    borderColor: "#e8e8e8",
    backgroundColor: "#F6F6F6",
    height: 50,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    color: "#212121",
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingBottom: 16,
    paddingTop: 16,
    color: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    //  lineHeight: 1.19,
    color: "#ffffff",
  },
  bottomText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    //  lineHeight: 1.18,
    textAlign: "center",
    color: "#1B4371",
  },
});
