import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";

const FlatlistItem = (item) => {
  const { user } = useAuth();

  const photoURL = item.forEach((item) => item.photoURL);

  return (
    <TouchableOpacity
      style={tw(
        "flex-row items-center py-2 px-2 bg-white mx-2 my-2 rounded-lg"
      )}
    >
      <Image
        style={tw("rounded-full h-16 w-16 pr-2")}
        source={{ uri: photoURL }}
      />
      <Text>{item.displayName}</Text>
    </TouchableOpacity>
  );
};

export default FlatlistItem;

const styles = StyleSheet.create({});
