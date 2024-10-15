import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const App = () => {

  const openCamera = async () => {
    const result = await launchCamera({ includeBase64: true })
  }

  const openGallery = async () => {
    const result = await launchImageLibrary({})
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "maroon", padding: 24, gap: 24 }}>
      <TouchableOpacity onPress={openCamera} style={{ padding: 16, paddingHorizontal: 32, backgroundColor: "#fff", borderRadius: 100 }}><Text style={{ color: "maroon", fontSize: 24, width: "100%", textAlign: "center" }}>Open Camera</Text></TouchableOpacity>
      <TouchableOpacity onPress={openGallery} style={{ padding: 16, paddingHorizontal: 32, backgroundColor: "#fff", borderRadius: 100 }}><Text style={{ color: "maroon", fontSize: 24, width: "100%", textAlign: "center" }}>Open Gallery</Text></TouchableOpacity>
    </SafeAreaView>
  )
}

export default App