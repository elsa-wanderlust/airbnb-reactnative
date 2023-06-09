import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; //  used instead of LocalStorage
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // transition between screens
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // simple tab bar on the bottom of the screen that lets you switch between different routes
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

// IMPORT IMAGE
import logo from "./assets/logo.png";

// IMPORT COMPONENTS
import SmallLogoAirBnB from "./components/SmallLogoAirBnB";

// IMPORT SCREENS
import AroundMeScreen from "./containers/AroundMeScreen";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import SplashScreen from "./containers/SplashScreen";
import DetailsOfferScreen from "./containers/DetailsOfferScreen";

// DECLARE VARIABLES FOR IMPORTS
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  // DECLARE STATES
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  // DECLARE FUNCTION : IF token: saves it in storage, IF NOT: removes it from storage (TBD)
  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };
  // console.log(userToken);
  // EVERY TIME WE OPEN
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            {/* --------- SCREEN : SIGN IN  ---------*/}
            <Stack.Screen name="SignIn" options={{ headerShown: false }}>
              {() => <SignInScreen setToken={setToken} />}
            </Stack.Screen>
            {/* --------- SCREEN : SIGN UP ---------*/}
            <Stack.Screen name="SignUp" options={{ headerShown: false }}>
              {() => <SignUpScreen setToken={setToken} />}
            </Stack.Screen>
            {console.log("no token")}
          </>
        ) : (
          // User is signed in ! 🎉
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              // --------TAB NAVIGATOR --------
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          headerTitle: () => <SmallLogoAirBnB />,
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="offerDetails"
                        options={{
                          headerTitle: () => <SmallLogoAirBnB />,
                        }}
                      >
                        {() => <DetailsOfferScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "User Profile",
                        }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="TabaroundMe"
                  options={{
                    tabBarLabel: "Around me",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"location-outline"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="aroundMe"
                        component={AroundMeScreen}
                      />
                      <Stack.Screen
                        name="offerDetailsMap"
                        options={{
                          headerTitle: () => <SmallLogoAirBnB />,
                        }}
                      >
                        {() => <DetailsOfferScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="TabSettings"
                  options={{
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"ios-options"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{
                          title: "Settings",
                        }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
