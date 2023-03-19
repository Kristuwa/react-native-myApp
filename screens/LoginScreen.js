import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ keyboardHide, isShowKeyboard, onFocus }) {
  const [state, setState] = useState(initialState);
  const { email, password } = state;

  const keyboardHideSubmitForm = () => {
    keyboardHide();
    setState(initialState);
    console.log(state);
  };

  return (
    <View
      style={{
        ...styles.form,
        paddingBottom: isShowKeyboard ? 0 : 132,
      }}
    >
      <Text style={styles.title}>Войти</Text>
      <View
        style={{
          ...styles.formContainer,
          marginBottom: isShowKeyboard ? 32 : 43,
        }}
      >
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
          <Text style={styles.btnTitle}>Войти</Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}>Нет аккаунта? Зарегистрироваться</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    paddingTop: 32,
    marginTop: "auto",
    backgroundColor: "#ffffff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    //  lineHeight: "1.17",
    marginBottom: 33,
    textAlign: "center",
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
