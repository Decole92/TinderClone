import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import ChatScreen from './Screens/ChatScreen';
import LoginScreen from './Screens/LoginScreen';
import ModalScreen from './Screens/ModalScreen';
import MatchScreen from './Screens/MatchScreen';
import ExploreScreen from './Screens/ExploreScreen';
import DashBoardScreen from './Screens/DashBoardScreen';

import useAuth from './hooks/useAuth';

const StackNavigator = () => {
 
    const Stack = createStackNavigator();

    const {user} = useAuth();

   
  return (
   
<Stack.Navigator

screenOptions={{

  headerShown:false,
  
}}

>
  
  
  {user ? (

    <>
    <Stack.Group>

<Stack.Screen name="Home" component={HomeScreen} />


<Stack.Screen name="Explore" component={ExploreScreen}/>

<Stack.Screen name="Dash" component={DashBoardScreen} />

<Stack.Screen name="Chat" component={ChatScreen} />

    </Stack.Group>

    <Stack.Group screenOptions={{ presentation: "Modal" }}
    >
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: "transparentModal" }}
    >
        <Stack.Screen name="Match" component={MatchScreen} />
      </Stack.Group>

      

    </>
  ) : (

    <>
    <Stack.Screen name="Login" component={LoginScreen} />

    </>
  )

  }
  



</Stack.Navigator>



  )
}

export default StackNavigator

const styles = StyleSheet.create({})
