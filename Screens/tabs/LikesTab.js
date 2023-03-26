import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import tw from "tailwind-rn";

const Likes = () => {
  const { user } = useAuth();
  const [likes, setLikes] = useState([]);
  const [users, setUsers] = useState([]);

  //users.forEach((item) => console.log(item.id));
  return (
    <View>
      <Text style={tw("px-5")}>Sorry! you have no Like at the moment😊</Text>
    </View>
  );
};

export default Likes;

const styles = StyleSheet.create({});
