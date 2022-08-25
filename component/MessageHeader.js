import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView} from 'react-native'
import React from 'react'
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "tailwind-rn"
import { useNavigation } from '@react-navigation/native';



const MessageHeader = ({ name, photo }) => {


    const navigation = useNavigation();

  return (

    <View style={tw("p-2 flex-row items-center px-4 justify-between")}>
<View style={tw("flex flex-row items-center")}>
    <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={34} color="grey" />
    </TouchableOpacity>


<TouchableOpacity style={tw("flex-row justify-between items-center")} >

<View style={tw("pr-2 pl-5 ")}>
      <Image style={tw("w-14 h-14 rounded-full")}
        source={{uri: photo}} />

</View>


<View>

        <Text style={tw("font-bold text-gray-500 text-lg text-center")}>{name}</Text>
    

</View>
    </TouchableOpacity >

    
</View>

<View style={tw("flex flex-row justify-between")}>

    <TouchableOpacity style={tw("w-50 pr-5")}>
        <FontAwesome5 name="video" size={30} color="#46a2da" />
    </TouchableOpacity>

    <TouchableOpacity style={tw("w-50")}>
        <MaterialCommunityIcons name="security" size={30} color="#46a2da" />

    </TouchableOpacity>

</View>


</View>

  )
}

export default MessageHeader

const styles = StyleSheet.create({})