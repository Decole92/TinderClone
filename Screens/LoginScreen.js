import {
  StyleSheet,
  Button,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-rn";

const LoginScreen = () => {
  const { loading, promptAsync } = useAuth();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={tw("flex-1")}>
      <StatusBar style="light" />

      <ImageBackground
        resizeMode="cover"
        style={tw("flex-1")}
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <TouchableOpacity
          style={[
            tw(
              "absolute bottom-40 w-60 items-center bg-white p-4 pl-2 rounded-2xl flex-row justify-evenly"
            ),
            { marginHorizontal: "25%" },
          ]}
          onPress={() => promptAsync({ showInRecents: true })}
        >
          <Image
            resizeMode="contain"
            style={tw("h-7 ")}
            source={require("../assets/google-ico.png")}
          />
          <Text style={tw("font-semibold text-center")}>
            {loading ? "Signing with Google..." : "Sign in & get Swiping"}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
