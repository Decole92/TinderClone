import { StatusBar } from "expo-status-bar";
import { LogBox, SafeAreaView, Text, View } from "react-native";
LogBox.ignoreAllLogs();
import tw from "tailwind-rn";

//import { FIREBASE_API_KEY } from '@env';

import {
  AntDesign,
  Entypo,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./Screens/HomeScreen";
import ChatScreen from "./Screens/ChatScreen";
import LoginScreen from "./Screens/LoginScreen";
import ModalScreen from "./Screens/ModalScreen";
import MatchScreen from "./Screens/MatchScreen";
import ExploreScreen from "./Screens/ExploreScreen";
import DashBoardScreen from "./Screens/DashBoardScreen";
import MessageScreen from "./Screens/MessageScreen";
import useAuth from "./hooks/useAuth";
import { NavigationContainer } from "@react-navigation/native";
//import StackNavigation from './StackNavigator';
import { AuthProvider } from "./hooks/useAuth";
const Tab = createBottomTabNavigator();
function App() {
  const Stack = createStackNavigator();
  const { user } = useAuth();
  console.log("api_key", process.env.FIREBASE_API_KEY);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <>
            <Stack.Group>
              <Stack.Screen name="MyTab" component={MyTab} />
              <Stack.Screen name="Message" component={MessageScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "Modal" }}>
              <Stack.Screen name="Modal" component={ModalScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
              <Stack.Screen name="Match" component={MatchScreen} />
            </Stack.Group>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MyTab() {
  return (
    <Tab.Navigator
      initialRouteName={HomeScreen}
      tabBarOptions={{
        showLabel: false,
      }}
      screenOptions={{
        tabBarInactiveTintColor: "grey",
        tabBarActiveTintColor: "#FF5864",

        tabBarStyle: {
          height: 70,
          paddingBottom: 6,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,

          tabBarIcon: ({ focused, color }) => (
            <Fontisto
              name="tinder"
              size={30}
              color={focused ? "#FF5864" : "grey"}
            />
          ),
        }}
        component={HomeScreen}
      />

      <Tab.Screen
        name="Explore"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name="view-grid-plus-outline"
              size={30}
              color={focused ? "#FF5864" : "grey"}
            />
          ),
        }}
        component={ExploreScreen}
      />
      <Tab.Screen
        name="Dash"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name="star-four-points"
              size={30}
              color={focused ? "#FF5864" : "grey"}
            />
          ),
        }}
        component={DashBoardScreen}
      />
      <Tab.Screen
        name="Chat"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="chatbubbles-sharp"
              size={30}
              color={focused ? "#FF5864" : "grey"}
            />
          ),
        }}
        component={ChatScreen}
      />
    </Tab.Navigator>
  );
}

function Main() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default Main;
