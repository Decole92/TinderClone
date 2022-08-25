import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useLayoutEffect} from 'react'
import useAuth from '../../hooks/useAuth'
import { collection, doc, query, orderBy, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import tw from 'tailwind-rn';
import { useNavigation } from '@react-navigation/native';
//import FlatListItem from '../../component/FlatListItem';

const Swipes = () => {


  const {user} = useAuth();
  const [likeSent, setLikeSent] = useState([]);
  


const navigation = useNavigation();


      useEffect(() => {

        let unsub;

        const fetch = async () => {
        
          unsub = await getDocs(collection(db, "users", user.uid, "swipes"))
           .then((snapshot) => (
        setLikeSent(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})
         )
           
         )));
          
           
        }
        navigation.addListener('focus', () => {
        
          fetch();
        
          return unsub;
          //Put your Data loading function here instead of my loadData()
        });
    
    
        }, [db, navigation])




 likeSent.forEach(item => (item))


 const FlatListItem = (item) => {

   return (
         <TouchableOpacity 
        style={tw("flex-row items-center h-40 py-2 px-2 bg-white mx-3 my-2 rounded-lg")}>
         <Image 
         style={tw("h-full w-40")}
     
         source={{uri:item.photoURL
         }}
         />

         <Text></Text>
        
       </TouchableOpacity>
             )
         
 
 }
 


 return likeSent.length > 0 ?

 
 (


  <View style={[tw("")]}>

    <FlatList 
   
   //contentContainerStyle={{height:350}}
  // showsHorizontalScrollIndicator={false}
    data={likeSent} 
    numColumns={2}
    keyExtractor={(item) => item.id}
    renderItem={({item}) => FlatListItem(item)
    }

    />
  </View>


  ) : (

    <View style={tw("p-5")}>
        <Text style={tw("text-center-text-lg")}>No Like sent at the moment😊</Text>
    </View>

  )


  
}



export default Swipes

const styles = StyleSheet.create({})