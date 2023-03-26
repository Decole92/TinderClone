import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Entypo, Fontisto, Ionicons } from "@expo/vector-icons";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";

//import getMatchedUserInfo from '../lib/getMatchedUserInfo';

const MatchScreen = () => {
  const navigation = useNavigation();
  const [matchDetails, setMatchDetails] = useState([]);
  const { user } = useAuth();
  const { params } = useRoute();
  const { loggedInProfile, userSwiped, status } = params;
  ///const [matchDetails, setMatchDetails] = useState([]);
  return (
    <View style={[tw("h-full bg-red-200"), { opacity: 0.89 }]}>
      <View style={tw("justify-center items-center h-1/3 pt-20")}>
        <Image
          style={[tw(" h-25 w-full"), styles.mat]}
          resizeMode="contain"
          source={require("../assets/mat.png")}
        />
      </View>
      <Text style={tw("text-white text-center mt-5")}>
        You and {userSwiped.displayName} have liked each Other.
      </Text>

      <View
        style={[tw("flex-row justify-evenly items-center mt-5"), styles.mat]}
      >
        <Image
          style={tw("h-32 w-1/3 rounded-full")}
          source={{ uri: userSwiped.photoURL }}
        />

        <AntDesign
          style={tw("justify-center transparent center-50 items-center")}
          name={status}
          size={80}
          color="grey"
        />

        <Image
          style={tw("h-32 w-1/3 rounded-full ")}
          source={{ uri: loggedInProfile.photoURL }}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Chat");
        }}
        style={tw("bg-white m-5 px-10 py-8 rounded-full mt-20")}
      >
        <Text style={tw("text-center justify-center font-bold")}>
          Send a Message
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={tw("text-center text-white font-bold")}>Later</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;

const styles = StyleSheet.create({
  mat: {
    width: "100%",
  },
});
