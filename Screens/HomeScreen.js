import { StyleSheet,
    Button, 
   Text,
    View,
     SafeAreaView, 
     TouchableOpacity,
      Image
  
      } from 'react-native';
 import React, { useEffect, useLayoutEffect, useRef } from 'react';
 import { StatusBar } from 'expo-status-bar';
 import { useNavigation } from '@react-navigation/native';
 import useAuth from '../hooks/useAuth';
 import tw from "tailwind-rn";


 import { AntDesign, Entypo, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
 import Swiper from 'react-native-deck-swiper-renewed';
import { setDoc, doc, collection, onSnapshot, query, where, serverTimestamp, getDocs, getDoc} from '@firebase/firestore';
import { db } from '../firebase';
 import generateID from '../lib/generateID';


 
 
 const HomeScreen = () => {
 
     const navigation = useNavigation();
 
     const {user, logout} = useAuth();

 
   
    const swipeRef = useRef(null);

    const [profiles, setProfiles] = React.useState([]);
  
   const [profilePhoto, setProfilePhoto] = React.useState();

   
 
//const photoURL = user.photoURL;

     useLayoutEffect(
      
      () => onSnapshot(doc(db, "users", user.uid), (snapshot) => {

      
      
       if(!snapshot.exists()){

        
        navigation.navigate("Modal"); 


       }
        

       }),

    

     
    
    [])

     

 

    useEffect(()=> {
 
       let unsub;

       const fetchCards = async() => {


        const loggedInProfile = await ( await getDoc(doc(db, "users", user.uid))).data();

        setProfilePhoto(loggedInProfile.photoURL);
  

       
    const passes = await getDocs(collection(db, "users", user.uid, "passes"))
    .then((snapshot) => snapshot.docs.map((doc) => doc.id));


    const swipes = await getDocs(collection(db, "users", user.uid, "swipes"))
    .then((snapshot) => snapshot.docs.map((doc) => doc.id));


    const supers = await getDocs(collection(db, "users", user.uid, "super"))
    .then((snapshot) => snapshot.docs.map((doc) => doc.id));

    
    const passedUserIds = passes.length > 0 ? passes : ['test'];
    const swipedUserIds = swipes.length > 0 ? swipes : ['test'];
    const superUserIds = supers.length > 0 ? supers : ['test'];

   
       //console.log([...passedUserIds, ...swipedUserIds, ...superUserIds]);

       unsub = onSnapshot(
        query(collection(db, "users"), where("id", "not-in", [...passedUserIds, ...swipedUserIds, ...superUserIds])),
        (snapshot) => {
        setProfiles(
snapshot.docs.filter((doc) => doc.id !== user.uid && doc.data().sex !== loggedInProfile.sex)
        .map((doc) => ({
      
        id:doc.id,
        ...doc.data(),

        })))
       })
      // console.log(profiles.id);

}
navigation.addListener('focus', () => {
        
  fetchCards();


});
   
    return unsub;       

   

    }, [db, navigation])


 
  

const swipeLeft = async (cardIndex) =>{
  if(!profiles[cardIndex]) return;

  const userSwiped = profiles[cardIndex];

  console.log(`You swipe PASS ON ${userSwiped.displayName}`);

  setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);

  //missed super match

  getDoc(doc(db, "users", userSwiped.id, "super", user.uid)).then(
    (missedSuper) => {

      if(missedSuper.exists()){
        console.log(`You missed a super match with ${userSwiped.displayName}`);
      }
    }
  )

  //missed match

  getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(

    (missedSnapshot) => {

      if(missedSnapshot.exists()){

        console.log(`You missed match with ${userSwiped.displayName}`)

      }
    }
  )

}

const swipeRight = async (cardIndex) =>{

  if(!profiles[cardIndex]) return;

  const userSwiped = profiles[cardIndex];

  const loggedInProfile = await ( await getDoc(doc(db, "users", user.uid))).data();

  setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);

  
 
  //check if user super liked you
getDoc(doc(db, "users", userSwiped.id, "super", user.uid)).then(

  (superSnapshot) => {

    if(superSnapshot.exists()){

     console.log(`Hooray, You  SUPER Matched with ${userSwiped.displayName}`) 

     //create a super match


     setDoc(doc(db, "matches", generateID(user.uid, userSwiped.id)),{
  
      users:{
  
      [user.uid]: loggedInProfile,
      [userSwiped.id]: userSwiped
  
      }, 
      usersMatched: [user.uid, userSwiped.id],
      timestamp: serverTimestamp(),
      status: "star",
  
     });
     
    const status = "star";

     navigation.navigate("Match", {
       loggedInProfile,
        userSwiped,
   

       status,

      
       
       
     })
  


}else{   

// checked if user like you  


  getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(

    (documentSnapshot) => {
  
     if(documentSnapshot.exists()){
  
     console.log(`Hooray, You MATCHED with ${userSwiped.displayName}`);

  
     //create a match
      setDoc(doc(db, "matches", generateID(user.uid, userSwiped.id)),{
  
      users:{
  
      [user.uid]: loggedInProfile,
      [userSwiped.id]: userSwiped
  
      }, 
      usersMatched: [user.uid, userSwiped.id],
      timestamp: serverTimestamp(),
      status: "heart",
  
     });
  

     
     const status = "heart";
     navigation.navigate("Match", {
  
       loggedInProfile,
       usersMatched: [user.uid, userSwiped.id],
       userSwiped,
       status,
       
     })
  
  
     }else{
  
       
    console.log(`You swipe Like on ${userSwiped.displayName} (${userSwiped.job})`);
       
             }
           }
          )
         }
       }
     )
   }
  

const swipeTop = async (cardIndex) =>{
  
       
 if(!profiles[cardIndex]) return;

 const userSwiped = profiles[cardIndex];

 

 const loggedInProfile = await ( await getDoc(doc(db, "users", user.uid))).data();


 setDoc(doc(db, "users", user.uid, "super", userSwiped.id), userSwiped);



 //check if user super liked you

 getDoc(doc(db, "users", userSwiped.id, "super", user.uid)).then(

  (documentSnapshot) => {
  
     if(documentSnapshot.exists()){

//create a super match
     setDoc(doc(db, "matches", generateID(user.uid, userSwiped.id)),{
  
      users:{
  
      [user.uid]: loggedInProfile,
      [userSwiped.id]: userSwiped
  
      }, 
      usersMatched: [user.uid, userSwiped.id],
      timestamp: serverTimestamp(),
      status: "star",
  
     });
     
    const status = "star";

     navigation.navigate("Match", {

       loggedInProfile,
       userSwiped,
       status,
       
       
     })
  
     }else{

      //check if user liked you

      getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(

        (documentSnapshot) => {

        if(documentSnapshot.exists()){

          //create a super liked

          setDoc(doc(db, "matches", generateID(user.uid, userSwiped.id)),{
  
            users:{
        
            [user.uid]: loggedInProfile,
            [userSwiped.id]: userSwiped
        
            }, 
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
            status: "star",
        
           });
           
          const status = "star";
      
           navigation.navigate("Match", {
             loggedInProfile,
             userSwiped,
             status,
             usersMatched: [user.uid, userSwiped.id],
             
           })
  
        

       
        }else{

        console.log(`You Super Like ON ${userSwiped.displayName} (${userSwiped.looking_for})`);


        }


        });


      

    
    

     }

  })




}

 
 return (

 
  <SafeAreaView style={tw("flex-1")}>

  <StatusBar style="auto" />
 
 
  <View style={tw("flex-row items-center py-6 px-5 justify-between relative")}>
   
 <View>
 <TouchableOpacity
 style={{zIndex:1}}
 onPress={logout}>
 
 
  
 <Image 
 style={tw("h-10 w-10 rounded-full")}
 source={{uri:profilePhoto}} />
 </TouchableOpacity>
   
 </View>
 
 <View>
   
 <TouchableOpacity
 style={{zIndex: 1}}
>
 
 <Image
     resizeMode="contain"
     style={tw("h-14 w-20")}
     
     source={ require("../assets/tinder1.png")}
      />
   
 
 </TouchableOpacity>
 
 <TouchableOpacity>
 
 </TouchableOpacity>
 
 </View>
 
 
 <View>
 </View>
 
  
 
  
  </View>
  <View style={tw("flex-1 -mt-20")}>
  
    <Swiper 
    ref={swipeRef}
    containerStyle={{backgroundColor: "transparent"}}
    showSecondCard={true} 
    cards={profiles}
    stackSize={5}
    cardIndex={0}
    animateCardOpacity
    verticalSwipe={true}
    disableBottomSwipe={true}
   
 
  
    onSwipedLeft={(cardIndex) => {
  
      console.log("Pass");
      swipeLeft(cardIndex);
  
    }}
  
    onSwipedRight={(cardIndex)=> {
 
      console.log("match");
      swipeRight(cardIndex);
    }}
 
    onSwipedTop={(cardIndex) => {
   
   console.log("super like");
   swipeTop(cardIndex);
 
 }}
 
 
  
    overlayLabels={{
  
 
  top:{
  
    title:"SUPER LIKE",
    style:{
       label:{
        color:"#1DB5CE",
        borderColor:"#1DB5CE",
        borderWidth:5,
        width:180,
          textAlign:"center",
        
       },
       wrapper:{
        flex:1,
      //  flexDirection:"column",
        justifyItems:"center",
        alignItems:"center",
        marginTop:200,
        
       }
    }
  
  },
  
      left:{
       
        title:"NOPE" ,
             
          style:{
            label:{
              color:"red",
              margin:10,
           alignItems:"center",
           justifyItems:"center",
              width:140,
              height:80,
              borderColor:"red",
              borderWidth:5
              },
  
 
 
              wrapper:{
                alignItems:"flex-end",
                
              }
        }
  
      },
      right:{
         title:"LIKE",
         style:{
          label:{
            color:"#4DED30",
            margin:10,
         alignItems:"center",
         justifyItems:"center",
            width:120,
            height:80,
            borderColor:"#4DED30",
            borderWidth:5
            },
        
 
         }
      },
 
 
     
 
    }}
    renderCard={(card) => card ? (
  
  
      <View key={card.id} 
      style={tw("relative top-0 left-0 right-0 bg-white h-3/4  w-full rounded-xl")}>
        <Image 
        style={tw("absolute h-full w-full rounded-xl")}
        source={{ uri:card.photoURL }}
        />
  
        <View style={[tw("absolute bg-white bottom-0 w-full h-20 px-6 py-2 rounded-b-xl"), styles.cardShadow]}>
         <View>
          <Text style={tw("text-xl font-bold")}>{card.displayName} <Text style={tw("text-2xl")}> {card.age}</Text></Text>
          <Text>{card.job}</Text>
          
         </View>
      
        </View>
  
    </View>
   ) : (
 
   <View style={[tw("relative bg-white h-3/4 rounded-xl justify-center items-center"),
   styles.cardShadow,
   ]}>
 <Text style={tw("font-bold pb-5")}>No More Profiles</Text>
 <Image 
 
  style={tw("h-40 w-40")}
  height={100}
  width={100}
  source={{ uri:"http://links.papareact.com/6gb"}}
 />
     </View>
 
   )}
  
    
     />
  </View>
  
  <View style={tw("absolute items-center justify-center bottom-3 right-0 left-0 flex-row justify-evenly")}>
  
  <TouchableOpacity onPress={() => {/*swipeRef.current.swipeBack()*/}}
  style={tw("items-center justify-center rounded-full border-2 border-yellow-500 w-12 h-12 bg-yellow-200")}>
    <MaterialIcons name="replay" size={25} color="yellow" />
  </TouchableOpacity>
  
  <TouchableOpacity onPress={()=> swipeRef.current.swipeLeft()}
  style={tw("items-center justify-center rounded-full border-2 border-red-500 w-16 h-16 bg-red-200")}>
  <Entypo name="cross" size={30} color="red" /></TouchableOpacity>
  
  <TouchableOpacity onPress={() => swipeRef.current.swipeTop()}
  style={tw("items-center justify-center rounded-full border-2 border-blue-300 w-12 h-12 bg-green-200")}>
  <AntDesign name="star" size={25} color="#1DB5CE"/></TouchableOpacity>
  
  <TouchableOpacity onPress={()=> swipeRef.current.swipeRight()}
  style={tw("items-center justify-center rounded-full border-2 border-green-500 w-16 h-16 bg-green-200")}>
    <AntDesign name="heart" size={30} color="green" /></TouchableOpacity>
  
    <TouchableOpacity style={tw("items-center justify-center rounded-full border-2 border-purple-600 w-12 h-12 bg-indigo-200")}>
  <MaterialIcons name="bolt" size={25} color="#8266B3" />
    </TouchableOpacity>
  </View>
  
  
  

  </SafeAreaView>
 
          
   
        
      );
    };




 
 export default HomeScreen;
 
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
 
 
 