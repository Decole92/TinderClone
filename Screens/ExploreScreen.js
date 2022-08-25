import { ImageBackground, StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import {SafeAreaView}  from "react-native-safe-area-context";
import tw from 'tailwind-rn';

import React from 'react'
import Header from '../component/Header';
import { ScrollView } from 'react-native-gesture-handler';



const ExploreScreen = () => {
  return (

  

    <SafeAreaView style={tw("flex-1")}>
<ScrollView>

     <Header />
  <View style={tw("py-2 px-2")}>
    
    <Text style={tw("text-black font-bold text-lg")}> Welcome to Explore</Text>
    <Text style={tw("p-2")}>My Vibe...</Text>
  </View>
 <View style={tw("flex-row justify-around w-full")}>
 <TouchableOpacity> 
  <ImageBackground source={require("../assets/background1.jpg")} resizeMode="cover" imageStyle={{ borderRadius: 8}} style={tw("h-60 w-40")}>
    <Text style={tw("flex-1 items-center font-bold text-xl px-2 pt-20 text-white")}>Free Tonight?</Text><Text numberOfLines={2} ellipsizeMode='tail' style={[tw("text-white px-2 font-bold text-lg")]}>Down for Something sponteneous</Text><Text style={tw("text-white pl-2 pb-3")}>Discover</Text></ImageBackground>
  
  </TouchableOpacity>
  
  <TouchableOpacity>

<ImageBackground source={require("../assets/background2.jpg")} resizeMode="cover" imageStyle={{ borderRadius: 8}} style={tw("h-60 w-42")}>
  <Text style={tw("flex-1 items-center font-bold text-xl px-2 pt-20 text-white")}>Let's be friends.</Text><Text style={tw("text-white pl-3 pb-1 font-bold text-lg")}>Maybe even besties</Text><Text style={tw("text-white pl-3 pb-3")}>Discover</Text></ImageBackground>

  </TouchableOpacity>

 </View>

<TouchableOpacity>


  <ImageBackground source={require("../assets/coffee.jpg")} resizeMode="cover" imageStyle={{borderRadius:8}} style={tw("h-60 w-90 my-7 mx-2")}>  

 <View style={tw("flex-1")}>
  <Text style={tw("flex-1 text-white font-bold text-3xl  pl-2 pt-20")}>Coffee Date.</Text>

  <View style={tw("flex-row justify-between px-3 py-0")}>

  <Text style={tw("text-white")}>Take me to your favourite cafe</Text>


 <TouchableOpacity 
 
 style={tw("bg-white w-40 h-10 items-center justify-center font-bold rounded-full text-black")}>

  <Text style={tw("font-bold")}>JOIN NOW</Text>

  </TouchableOpacity> 
 
 </View>
 <Text style={tw("text-white font-bold pb-3 px-3")}>Discover</Text>

  </View>
  

  </ImageBackground>
</TouchableOpacity>
</ScrollView>
     

    </SafeAreaView>




  )
}

export default ExploreScreen

const styles = StyleSheet.create({})