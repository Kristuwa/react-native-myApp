import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import photo from "../../assets/photo.jpg";
import imageOne from "../../assets/imagePost-01.jpg";
import imageTwo from "../../assets/imagePost-02.jpg";
import { EvilIcons } from "@expo/vector-icons";

const posts = [
  //   {
  //     id: "1",
  //     photo: imageOne,
  //     name: "Лес",
  //     comments: 0,
  //     location: "Ivano-Frankivs'k Region, Ukraine",
  //   },
  {
    id: "2",
    photo: imageTwo,
    name: "Рассвет",
    comments: 2,
    location: "Lviv Region, Ukraine",
  },
];

function Item({ photo, location, name, comments }) {
  return (
    <View style={{ marginBottom: 34 }}>
      <Image style={styles.image} source={photo} />
      <Text style={{ ...styles.placeName, fontFamily: "Roboto-Medium" }}>
        {name}
      </Text>
      <View style={styles.locationCommentContainer}>
        <TouchableOpacity
        //   onPress={() => navigation.navigate("CommentsScreen")}
        >
          <View style={styles.commentContainer}>
            <EvilIcons
              style={styles.commentLogo}
              name="comment"
              size={24}
              color="black"
            />
            <Text style={styles.commentAmount}>{comments}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
        //   onPress={() => navigation.navigate("MapScreen")}
        >
          <View style={styles.location}>
            <EvilIcons name="location" size={24} color="black" />
            <Text
              style={{
                ...styles.locationText,
                fontFamily: "Roboto-Regular",
              }}
            >
              {location}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function PostsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.textTop}>Публикации</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <SimpleLineIcons
            style={{ marginRight: 18 }}
            name="login"
            size={24}
            color="#BDBDBD"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.userContent}>
          <Image style={styles.userAvatar} source={photo} />
          <View style={styles.textContent}>
            <Text style={styles.userName}>Natali Romanova</Text>
            <Text style={styles.userEmail}>email@example.com</Text>
          </View>
        </View>
        <View>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Item
                name={item.name}
                photo={item.photo}
                location={item.location}
                comments={item.comments}
              />
            )}
          />
        </View>
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
  mainContent: { flex: 1, marginHorizontal: 16 },
  userContent: {
    flexDirection: "row",
    marginTop: 32,
    marginBottom: 32,
  },
  textContent: { paddingTop: 15 },
  userAvatar: { width: 60, height: 60, marginRight: 8 },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  placeName: {
    fontWeight: "500",
    fontSize: 16,
    color: "#212121",
    marginBottom: 11,
  },
  image: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 8,
  },
  locationCommentContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 8,
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  commentLogo: {
    marginRight: 6,
  },
  commentAmount: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#212121",
  },
});
