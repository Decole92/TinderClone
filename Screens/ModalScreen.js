import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect, useEffect} from 'react'
import { askForPermission, pickImage, openGallery, askForPermissonLib, uploadImage } from '../util';


import { Fontisto, Entypo, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import tw from "tailwind-rn";
import { BottomPopup } from './BottomPopup';
import useAuth from '../hooks/useAuth';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { onSnapshot, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import SwitchSelector from 'react-native-switch-selector';


const ModalScreen = () => {

  let popupRef = React.createRef()
  const onShowPopup = () => {
    popupRef.show()
  }


  const onClosePopup = () => {
    
    popupRef.close()
    
  }

  const genderOptions = [

    { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  
  ]
  
  
  const isFocused = useIsFocused();

  const {user, loading} = useAuth();
  
  const navigation = useNavigation();

  const [selectedImage, setSelectedImage] = React.useState(null);
 
 const [permissionStatus, setPermissionStatus] = React.useState(null);

 const[permissionGallery, setPermissionGallery] = React.useState(null);

 const [job, setJob] = React.useState(null);

 const[age, setAge] = React.useState(null);

 const[goal, setGoal] = React.useState(null);

 const[gender, setGender] = React.useState("Male");

 

 
React.useEffect(() =>{

  (async ()=> {

    const gallery = await askForPermissonLib();
    setPermissionGallery(gallery);

    const status = await askForPermission();
    setPermissionStatus(status);
    
  })()
})


   async function openCamera() {

    const result = await pickImage();

   if(!result.cancelled){

    popupRef.close()
       setSelectedImage(result.uri);

     
      }

  

   }

async function openFolder(){

  const result = await openGallery();

  popupRef.close()

  setSelectedImage(result.uri);


  

}


   if(!permissionStatus && !permissionGallery){

    return<Text>Loading...</Text>;

   }

   if(permissionStatus !== "granted" && permissionGallery !== "granted"){
     
     return <Text>You need to allow this permissionStatus</Text>;

   }



 const incompleteForm = !selectedImage || !age || !goal || !job;



const uploadProfile = async () => {


let photoURL;

if(selectedImage){

  const{ url } = await uploadImage(selectedImage,`images/${user.uid}`,"profilePicture" );

  photoURL = url;

}



 Promise.all([

  setDoc(doc(db, "users", user.uid),{
    id: user.uid,
    displayName: user.displayName,
    photoURL: photoURL,
    sex: gender,
    job: job,
    age: age,
    looking_for: goal,
    timestamp: serverTimestamp()})


  ])

  


   navigation.goBack();

   



}


 

  return (

    < KeyboardAwareScrollView>
  
    
    <View style={tw("flex-1 items-center pt-5")}>
      
     

      <Image 
      style={tw("h-20 w-full")}
      resizeMode="contain"
      source={{ uri: "https://links.papareact.com/2pf" }}
      />

      <Text style={tw("text-xl text-gray-500 p-3  font-bold")}>Welcome {user.displayName}</Text>

    <TouchableOpacity
   onPress={onShowPopup}
   style={[tw("h-40 w-40 items-center justify-center rounded-full"), styles.camero]}>


{!selectedImage ? ( <Fontisto  name="camera" size={50}  color="white" />)
 : (<Image source={{uri:selectedImage}} style={tw("h-40 w-40 rounded-full items-center-justify-center")}/> )}
 
 
 <View>

  {
    
    !selectedImage ? ( <MaterialIcons style={tw("absolute left-9 top-55")} name="add-circle" size={40} color="white" /> ) :
    
    (null)
    
}

 </View> 
 </TouchableOpacity>




 <Text style={[tw("text-center p-3 font-bold text-xl text-red-400"), styles.gap]}>
  Step 1: My job is</Text>
 <TextInput placeholder="Enter a Job" 
 value={job}
 onChangeText={setJob}
 style={tw("text-center text-xl pb-2")}
 
 />

<View style={tw("w-40")}>

<SwitchSelector 

textColor="red"

buttonColor="#FF5864"

selectedColor="white"
options={genderOptions}
initial={0}
onPress={value => {
  setGender(value);
  console.log(gender)

}
}
/>

</View>

<Text style={[tw("text-center p-3 font-bold text-xl text-red-400"), styles.gap]}>
  Step 2: The Age</Text>
 <TextInput placeholder="Enter Your Age" 
    value={age}
    onChangeText={setAge}
    style={tw("text-center text-xl pb-2")}
    maxLength={2}
    keyboardType="numeric"
    
    />

<Text style={[tw("text-center p-3 font-bold text-xl text-red-400"), styles.gap]}>
  Step 3: Looking For</Text>
 <TextInput placeholder="Enter Your Goal" 
    value={goal}
     onChangeText={setGoal}
    style={tw("text-center text-xl pb-2")}
    
    />




    <BottomPopup 


title={<Ionicons name="camera" onPress={openCamera} size={30} style={{color:"#FF5864", flex:1, justifyContent:"flex-start"}}/>}

space={<Entypo name="dots-two-vertical" size={30} color="white" />}

body = {<MaterialCommunityIcons onPress={openFolder} name="folder-image" size={30}  style={{color:"#FF5864", flex:1, justifyContent:"flex-end"}}/>}

ref={(target) => popupRef = target}
onTouchOutside={onClosePopup}

/> 


<TouchableOpacity 
   onPress={uploadProfile}
   disabled={incompleteForm}
   
   
   style={[
     tw("w-80 p-3 rounded-full"), { position:"relative", bottom:10,},
     incompleteForm ? tw("bg-gray-400") : tw(" bg-red-400")
    ]}>
      <Text style={tw("text-center text-white font-bold text-xl")}>{
        loading ? "Updating..." : "Update Profile"}</Text>
    </TouchableOpacity>

</View>

        
</KeyboardAwareScrollView>

  )
}

export default ModalScreen

const styles = StyleSheet.create({

camero:{
  backgroundColor:"#FF5864",
},
btm:{
  backgroundColor:"#FF5864"
},
gap:{
  width:"70%"
}
})