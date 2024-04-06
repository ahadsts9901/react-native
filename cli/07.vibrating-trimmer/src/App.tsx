import { ImageBackground, SafeAreaView, TouchableOpacity, Vibration } from 'react-native'
import React from 'react'
import trimmer from "./assets/trimmer.png"

export default function App() {

  return (
    <SafeAreaView style={{
      flex:1, 
      justifyContent:"center", 
      alignItems:"center",
      padding: 24
      }}>
      <ImageBackground source={trimmer} style={{
        height: 500,
        width:"100%",
        alignItems:"center"
      }}>
        <TouchableOpacity style={{
          width: 45,
          height:45,
          backgroundColor:"#f96464",
          borderRadius:500,
          borderWidth:5,
          marginTop: 320,
        }} onPress={()=>Vibration.vibrate(5000)}></TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  )
}