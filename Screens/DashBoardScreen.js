import { View, Text } from "react-native";
import React from "react";
import Header from "../component/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LikesTab from "./tabs/LikesTab";
import SwipesTab from "./tabs/SwipesTab";
import tw from "tailwind-rn";
const DashBoardScreen = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={tw("flex-1")}>
      <Header />
      <Tab.Navigator
        initialRouteName="Likes"
        tabBarOptions={{
          labelStyle: {
            fontSize: 15,
            fontWeight: "bold",

            borderTopWidth: 0,
          },

          style: {
            backgroundColor: "transparent",
            borderColor: "none",
          },

          indicatorStyle: {
            width: 0,
            height: 0,
          },
        }}
      >
        <Tab.Screen name="Likes" component={LikesTab} />
        <Tab.Screen name="Like Sent" component={SwipesTab} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default DashBoardScreen;
