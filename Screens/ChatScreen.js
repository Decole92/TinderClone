import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import tw from "tailwind-rn";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import ChatList from "../component/ChatList";
import MatchList from "../component/MatchList";
const ChatScreen = () => {
  return (
    <SafeAreaView style={tw("flex-1")}>
      <StatusBar style="auto" />
      <Header />

      <Text style={tw("text-lg font-bold text-black px-4 py-3")}>
        New Matches
      </Text>
      <MatchList />

      <Text style={tw("text-lg font-bold text-black px-4 py-3")}>Messages</Text>
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
