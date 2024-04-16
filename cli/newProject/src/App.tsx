import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./core";
import { login, logout } from "./redux/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EIcon from "react-native-vector-icons/Entypo";
import { View } from "react-native";
import Chat from "./screens/Chat";

const Stack = createNativeStackNavigator()

export default function App() {

  const dispatch = useDispatch()

  const currentUser = useSelector((state: { user: { _id: string } }) => state.user)

  useEffect(() => {
    checkLoginStatus()
  }, [])

  const checkLoginStatus = async () => {

    try {
      const hart = await AsyncStorage.getItem("hart")
      const resp = await axios.get(`${baseUrl}/api/profile`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${hart}`
        }
      })
      dispatch(login(resp.data.data))
    } catch (error: any) {
      dispatch(logout(null))
      console.log(error?.response?.data);
    }
  }

  return (
    <NavigationContainer>
      {
        currentUser?._id ?
          <Stack.Navigator initialRouteName="Home"
            screenOptions={{
              animation: "slide_from_right"
            }}
          >
            <Stack.Screen component={Home} name="Home"
              options={{
                title: "Native Chat",
                headerTitleStyle: {
                  fontFamily: "Jost-SemiBold",
                  fontSize: 20,
                  color: "#444"
                },
                headerLeft: () => (
                  <View style={{ marginRight: 16, marginVertical: 18 }}>
                    <EIcon name="chat" size={32} color="#444" />
                  </View>
                ),
              }}
            />
            <Stack.Screen component={Chat} name="Chat"
              options={{
                title: "Native Chat",
                headerTitleStyle: {
                  fontFamily: "Jost-SemiBold",
                  fontSize: 20,
                  color: "#444"
                },
              }}
            />
          </Stack.Navigator> : null
      }
      {
        !currentUser?._id ?
          <Stack.Navigator initialRouteName="Login"
            screenOptions={{
              animation: "slide_from_right"
            }}
          >
            <Stack.Screen name="Login" component={Login}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen name="Signup" component={Signup}
              options={{
                headerShown: false
              }}
            />
          </Stack.Navigator> : null
      }
    </NavigationContainer>
  )
}

// f5a641
// npm i react-native-screens @react-navigation/native @react-navigation/native-stack react-native-vector-icons