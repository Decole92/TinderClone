import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "tailwind-rn";
const SenderMessage = ({ message }) => {
  return (
    <View
      style={[
        tw("rounded-full rounded-tr-none text-white px-5 py-3 mx-3 my-2"),
        {
          alignSelf: "flex-start",
          marginLeft: "auto",
          backgroundColor: "#46a2da",
        },
      ]}
    >
      <Text style={tw("text-white text-lg")}>{message.message}</Text>
    </View>
  );
};

export default SenderMessage;

const styles = StyleSheet.create({});
