import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Shield from './src/screens/Shield'
import Egg from './src/screens/Egg'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Carrot from './src/screens/Carrot'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='shield'
          screenOptions={{
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name='shield' component={Shield}
            options={{
              title: "Shield",
              headerShown: false,
            }}
          />
          <Stack.Screen name='egg' component={Egg}
            options={{
              title: "Egg",
              headerShown: false
            }} />
          <Stack.Screen name='carrot' component={Carrot}
            options={{
              title: "Carrot",
              headerShown: false
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({})