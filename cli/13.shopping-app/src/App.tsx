import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Product from './screens/Product';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        animation: "slide_from_right"
      }}>
        <Stack.Screen name='Home' component={Home}
          options={{
            title: "Trending Products",
          }}
        />
        <Stack.Screen name='Product' component={Product}
          options={{
            title: "Product",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}