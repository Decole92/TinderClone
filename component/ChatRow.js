import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import tw from "tailwind-rn"
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const ChatRow = ({ matchDetails }) => {

    const navigation = useNavigation();
    
    const {user} = useAuth();

   const [matchedUserInfo, setMatchedUserInfo] = useState(null);

   const [lastMessage, setLastMessage] = useState("");


   useEffect(
     () => onSnapshot(query(collection(db, "matches", matchDetails.id, "messages"), 
     orderBy("timestamp", "desc")), (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)


     ), [matchDetails, db])

useEffect(() => {
  
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user?.uid))
    
  }, [matchDetails, user]);
  
  
 //console.log(`here is the matchdetails chatRow ${matchDetails.id}`);


  return (
   <TouchableOpacity onPress={() => { navigation.navigate("Message", {matchedUserInfo, matchDetails})}}
   style={[tw("flex-row item-center py-3 px-2 bg-white mx-3 my-1 rounded-lg"), styles.cardShadow]}>
    <Image 
    style={tw("rounded-full h-16 w-16 mr-4")}
    source={{uri:matchedUserInfo?.photoURL}}
    />

    <View>
      <Text style={tw("text-lg font-semibold justify-center")}>{matchedUserInfo?.displayName}</Text>
      <Text>{ lastMessage || "Say Hi" }</Text>
    </View>
   </TouchableOpacity>
  )
}

export default ChatRow;

const styles = StyleSheet.create({

  cardShadow:{
    shadowColor:"#000",
    shadowOffset:{
      width:0,
      height:1,
  
    },
    shadowOpacity:0.2,
    shadowRadius:1.41,
    elevation:2,
  
  }


})


