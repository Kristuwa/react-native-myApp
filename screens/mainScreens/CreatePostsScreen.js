import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";

const initialState = {
  location: "",
  nameLocation: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const { location, nameLocation } = state;
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const onFocus = () => {
    setIsShowKeyboard(true);
  };

  const keyboardHideSubmitForm = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
    console.log(state);
    //  navigation.navigate("PostsScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PostsScreen");
          }}
        >
          <AntDesign name="arrowleft" size={24} color="rgba(33, 33, 33, 0.8)" />
        </TouchableOpacity>

        <Text style={styles.textTop}>Создать публикацию</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.addPhoto}>
          <View style={styles.photoIcon}>
            <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
          </View>
        </View>
        <Text style={styles.textBottom}>Загрузите фото</Text>
        <View
          style={{
            ...styles.form,
          }}
        >
          <TextInput
            style={styles.input}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, location: value }))
            }
            value={nameLocation}
            placeholder="Название..."
            onFocus={onFocus}
          />

          <TextInput
            style={{ ...styles.input, marginBottom: 32 }}
            onChangeText={(value) =>
              setState((prevState) => ({
                ...prevState,
                password: value,
              }))
            }
            value={location}
            placeholder="Местность..."
            onFocus={onFocus}
          />
        </View>
        <TouchableOpacity
          style={styles.btnAddScreen}
          onPress={keyboardHideSubmitForm}
        >
          <Text style={styles.btnText}>Опубликовать</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  topContainer: {
    flexDirection: "row",
    paddingLeft: 16,
    paddingTop: 55,
    paddingBottom: 11,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  textTop: {
    marginLeft: 63,
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
  addPhoto: {
    width: Dimensions.get("window").width - 16 * 2,
    height: 240,
    backgroundColor: "#F6F6F6",

    marginTop: 32,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  photoIcon: {
    width: 60,
    height: 60,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  textBottom: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 48,
  },
  form: {
    width: "100%",
  },
  input: {
    borderBottomWidth: 1,
    paddingBottom: 16,
    borderBottomColor: "#E8E8E8",
    backgroundColor: "#ffffff",
    marginBottom: 47,
    color: "#BDBDBD",
    fontSize: 16,
  },
  btnAddScreen: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
    paddingTop: 16,
  },
  btnText: {
    color: "#BDBDBD",
  },
});
