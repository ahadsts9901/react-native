import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Torch from 'react-native-torch';
import RNShake from "react-native-shake"

const App = () => {

  const [_torch, set_torch] = useState(false)

  const openCamera = async () => {
    const result = await launchCamera({ includeBase64: true })
  }

  const openGallery = async () => {
    const result = await launchImageLibrary({})
  }

  const toggleTorch = () => {
    Torch.switchState(_torch)
    set_torch(!_torch)
  }

  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      console.log("shake detected")
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "maroon", padding: 24, gap: 24 }}>
      <TouchableOpacity onPress={openCamera} style={{ padding: 16, paddingHorizontal: 32, backgroundColor: "#fff", borderRadius: 100 }}><Text style={{ color: "maroon", fontSize: 24, width: "100%", textAlign: "center" }}>Open Camera</Text></TouchableOpacity>
      <TouchableOpacity onPress={openGallery} style={{ padding: 16, paddingHorizontal: 32, backgroundColor: "#fff", borderRadius: 100 }}><Text style={{ color: "maroon", fontSize: 24, width: "100%", textAlign: "center" }}>Open Gallery</Text></TouchableOpacity>
      <TouchableOpacity onPress={toggleTorch} style={{ padding: 16, paddingHorizontal: 32, backgroundColor: "#fff", borderRadius: 100 }}><Text style={{ color: "maroon", fontSize: 24, width: "100%", textAlign: "center" }}>Torch is {!_torch ? "ON" : "OFF"}</Text></TouchableOpacity>
    </SafeAreaView>
  )
}

export default App