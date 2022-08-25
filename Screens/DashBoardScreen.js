import { View, Text } from 'react-native'
import React from 'react'
import Header from '../component/Header';
import {SafeAreaView}  from "react-native-safe-area-context";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import LikesTab from './tabs/LikesTab';
import SwipesTab from './tabs/SwipesTab';
import tw from 'tailwind-rn';
import { db } from '../firebase';



const DashBoardScreen = () => {

  const Tab = createMaterialTopTabNavigator(); 

  return (
    <SafeAreaView style={tw("flex-1")}>
      <Header />





      <Tab.Navigator

  initialRouteName='Likes'



  tabBarOptions={{

   
    //activeTintColor: "black",

    labelStyle:{
       fontSize:15,
       fontWeight:"bold",

       borderTopWidth:0,
       
       
    
       },
    
    style:{
    
        backgroundColor:"transparent",
         borderColor:"none",
         
     
         
    },
    
    indicatorStyle:{
    
      //backgroundColor:"black",
    
      width: 0,
     height: 0      
    
    }
    
      }}

  

 >

<Tab.Screen name ="Likes" component={LikesTab}  />
<Tab.Screen name ="Like Sent" component={SwipesTab} />

</Tab.Navigator>






    </SafeAreaView>
  )
}

export default DashBoardScreen