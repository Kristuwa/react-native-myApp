import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.textTop}>Публикации</Text>
        <SimpleLineIcons
          style={{ marginRight: 18 }}
          name="login"
          size={24}
          color="#BDBDBD"
        />
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
    justifyContent: "flex-end",
    paddingTop: 55,
    paddingBottom: 11,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },
  textTop: {
    marginRight: 103,
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
});
