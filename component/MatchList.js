import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import tw from 'tailwind-rn';
import useAuth from '../hooks/useAuth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import MatchRow from './MatchRow';

const MatchList = () => {

  const [matches, setMatches] = useState([]); 
  const {user} = useAuth();
  
  useEffect(()=> 
 
onSnapshot(query(collection(db, "matches"),
where("usersMatched", "array-contains", user.uid)),
(snapshot) => 
setMatches(snapshot.docs.map((doc) => ({
    id:doc.id,
    ...doc.data(), })
)
)),
[]);
  return matches?.length > 0 ? (

  <View  style={[tw(""), { height:150}]}>

    <FlatList 
 horizontal
   
  contentContainerStyle={ { height:150}}
    showsHorizontalScrollIndicator={false}
    data={matches} 
    keyExtractor={(item)=> item.id}
    renderItem={({item}) => <MatchRow matchDetails={item}/> }/>
  </View>

  ) : (

    <View style={tw("p-5")}>
        <Text style={tw("text-center-text-lg")}>No Recent Match at the moment😊</Text>
    </View>

  )
}

export default MatchList

const styles = StyleSheet.create({})