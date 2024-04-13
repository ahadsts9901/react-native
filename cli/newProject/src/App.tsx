import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

// f5a641
// npm i react-native-screens @react-navigation/native @react-navigation/native-stack react-native-vector-icons