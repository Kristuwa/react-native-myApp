import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

import { db } from "../../firebase/config";
import { CommentItem } from "../../components/CommentItem";
import { useSelector } from "react-redux";
import {
  selectAvatar,
  selectUserId,
  selectUserName,
} from "../../redux/auth/authSelectors";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  addDoc,
} from "firebase/firestore";

export default function CommentsScreen({ route }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);
  const avatar = useSelector(selectAvatar);
  const { postId, photo } = route.params;

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const createPost = () => {
    sendComment();
    setText("");

    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const sendComment = async () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    try {
      const dbRef = doc(db, "posts", postId);
      const commentUploadObject = {
        text: text,
        date: date,
        time: time,
        userId: userId,
        userName: userName,
        avatar: avatar,
      };
      await updateDoc(dbRef, { comments: comments.length + 1 });
      await addDoc(collection(dbRef, "comments"), commentUploadObject);
    } catch (error) {
      console.log("SendComment Error", error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const dbRef = doc(db, "posts", postId);
      onSnapshot(collection(dbRef, "comments"), (docSnap) => {
        const allCommSnap = docSnap.docs;
        const allComm = allCommSnap.map((doc) => ({ ...doc.data() }));
        setComments(allComm);
      });
    } catch (error) {
      console.log("fetchComments Error", error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderItem = ({ item }) => {
    return <CommentItem item={item} isShowKeyboard={isShowKeyboard} />;
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: photo }} />
        <View style={{ height: 250 }}>
          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              data={comments}
              keyExtractor={comments.id}
              renderItem={renderItem}
            />
          </SafeAreaView>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.commentForm}>
            <TextInput
              style={styles.input}
              placeholder="Добавить комментарий..."
              value={text}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={setText}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={createPost}>
              <MaterialCommunityIcons
                name="send-circle"
                size={38}
                color="#FF6C00"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    marginBottom: 32,
    height: 240,
    width: Dimensions.get("window").width - 32,
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  commentForm: {
    position: "relative",
  },
  input: {
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    paddingLeft: 16,
  },
  sendBtn: {
    position: "absolute",
    top: 6,
    right: 10,
    width: 38,
    height: 38,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
});
