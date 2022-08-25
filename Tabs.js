
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import HomeScreen from "./Screens/HomeScreen";
import ExploreScreen from "./Screens/ExploreScreen";
import DashBoardScreen from "./Screens/DashBoardScreen";
import ChatScreen from "./Screens/ChatScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  
return (


 <Tab.Navigator>
<Tab.Screen name="Home" component={HomeScreen} />
  
  <Tab.Screen name="Explore" component={ExploreScreen} />
  <Tab.Screen name="Dash" component={DashBoardScreen} />
  <Tab.Screen name="Chat" component={ChatScreen} />

    </Tab.Navigator>
)
}
export default Tabs;