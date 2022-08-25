import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { collection, doc, where, getDoc, orderBy, onSnapshot, query } from 'firebase/firestore';
import tw from 'tailwind-rn';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import { db } from '../firebase';


const MatchRow = ({ matchDetails }) => {
    const navigation = useNavigation();
    const {user} = useAuth();

const [newMatches, setNewMatches] = useState([]);

const [matchedUserInfo, setMatchedUserInfo] = useState([]);


useEffect(() => {
  
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user?.uid))
    
  }, [matchDetails, user]);

  

  useEffect(
    () => onSnapshot(query(collection(db, "matches", matchDetails.id, "messages"), 
    orderBy("timestamp", "desc")), (snapshot) => 
    setNewMatches(snapshot.docs[0]?.data()?.message)


  
    ), [matchDetails, db])

   

   

//console.log(newMatches);

  return (

<>
   { 
        newMatches?.length > 0 ? <Text style={tw("text-center flex-1 justify-center")}></Text> 
        : 
           
<TouchableOpacity onPress={() => { navigation.navigate("Message", {matchedUserInfo, matchDetails})}}
style={[tw("flex-row item-center bg-white py-2 border-4 border-grey px-2 mx-2 my-2 rounded-lg"), {height:150, width:100, borderColor:"gold"}]}>
 
<Image 

 style={tw("rounded-lg h-full w-20")}
 source={{uri:matchedUserInfo?.photoURL}}
 />

</TouchableOpacity>
        }
 
    

</>
  )
  
}

export default MatchRow

const styles = StyleSheet.create({})