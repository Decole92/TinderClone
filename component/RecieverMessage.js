import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-rn'

const RecieverMessage = ({message}) => {
  return (
    <View style={[tw(" bg-gray-300 rounded-full rounded-bl-none px-5 py-3 mx-3 my-2 ml-14"), 
    {alignSelf:"flex-start"}]}>
        <Image style={tw("h-12 w-12 rounded-full absolute top-0 -left-14")}
        source={{uri:message.photoURL}}/>

      <Text style={tw("text-black text-lg")}>{message.message}</Text>
    </View>
  )
}

export default RecieverMessage

const styles = StyleSheet.create({})