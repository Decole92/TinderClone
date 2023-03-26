import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import tw from "tailwind-rn";
import { doc, getDoc } from "@firebase/firestore";
import useAuth from "../hooks/useAuth";

import React from "react";
import { db } from "../firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
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
  return (
    <View
      style={tw(
        "flex-row items-center py-0 px-5 top-0 justify-between relative"
      )}
    >
      <TouchableOpacity style={{ zIndex: 1 }} onPress={logout}>
        <Image
          style={tw("h-10 w-10 rounded-full")}
          source={{ uri: profilePhoto }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ zIndex: 1 }}
        onPress={() => navigation.navigate("Home")}
      >
        <Image
          resizeMode="contain"
          style={tw("h-14 w-20")}
          source={require("../assets/tinder1.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <MaterialCommunityIcons name="security" size={30} color="grey" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
