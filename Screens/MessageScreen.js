import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  Keyboard,
  TextInput,
  View,
  FlatList,
} from "react-native";
import MessageHeader from "../component/MessageHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import tw from "tailwind-rn";
import { useRoute } from "@react-navigation/native";
import { Button } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import SenderMessage from "../component/SenderMessage";
import RecieverMessage from "../component/RecieverMessage";
import {
  addDoc,
  getDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase";

const MessageScreen = () => {
  const { params } = useRoute();
  const { matchedUserInfo, matchDetails, userSwiped } = params;
  const disabled = !input;
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [matchDetails, db]
  );
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState("");
  const [profilePhoto, setProfilePhoto] = React.useState();
  React.useEffect(() => {
    let unsub;

    const fetchUsers = async () => {
      const loggedInProfile = await (
        await getDoc(doc(db, "users", user.uid))
      ).data();

      setProfilePhoto(loggedInProfile.photoURL);
    };
    fetchUsers();
    return unsub;
  }, [db]);

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoURL: profilePhoto,
      message: input,
    });
    setInput("");
  };

  return (
    <SafeAreaView style={tw("flex-1")}>
      <MessageHeader
        name={matchedUserInfo?.displayName}
        photo={matchedUserInfo?.photoURL}
      />

      <KeyboardAvoidingView
        behaviour={Platform.OS === "ios" ? "padding" : "height"}
        style={tw("flex-1")}
        KeyboadrdVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            inverted={-1}
            style={tw("pl-4")}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <RecieverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View
        style={tw(
          "flex-row justify-between items-center rounded-full bg-white border-t border-gray-200 px-5 py-2"
        )}
      >
        <TextInput
          style={tw("h-10 text-lg pr-5")}
          placeholder="Type a message..."
          onChangeText={setInput}
          numberOfLines={2}
          maxLength={50}
          //returnKeyType='next'

          //onSubmitEditing={}
          value={input}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text
            style={[
              tw("font-bold text-lg"),
              !input ? { color: "gr" } : { color: "#46a2da" },
            ]}
          >
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({});
