import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function App() {

  const [bg, setBg]: any = useState(null)
  const [circle, setCircle]: any = useState(null)
  const [square, setSquare]: any = useState(null)
  const [oval, setOval]: any = useState(null)
  const [rectangle, setRectangle]: any = useState(null)

  useEffect(() => {
    generateColors()
  }, [])

  const generateColors = () => {
    const options = "1234567890abcdef";

    // Color 1
    let color1 = "#";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * 16);
      color1 += options[randomIndex];
    }
    setBg(color1);

    // Color 2
    let color2 = "#";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * 16);
      color2 += options[randomIndex];
    }
    setCircle(color2);

    // Color 3
    let color3 = "#";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * 16);
      color3 += options[randomIndex];
    }
    setSquare(color3);

    // Color 4
    let color4 = "#";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * 16);
      color4 += options[randomIndex];
    }
    setOval(color4);

    // Color 5
    let color5 = "#";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * 16);
      color5 += options[randomIndex];
    }
    setRectangle(color5);
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: bg,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <View style={[styles.shape, { backgroundColor: circle, borderRadius: 50, width: 100, height: 100, marginBottom: 20 }]} />
      <View style={[styles.shape, { backgroundColor: square, width: 100, height: 100, marginBottom: 20 }]} />
      <View style={[styles.shape, { backgroundColor: oval, borderRadius: 50, width: 120, height: 80, marginBottom: 20 }]} />
      <View style={[styles.shape, { backgroundColor: rectangle, width: 120, height: 80 }]} />
      <TouchableOpacity onPress={generateColors}
      style={{
        backgroundColor:"#111",
        padding: 24,
        borderRadius:20
      }}
      ><Text style={{color:"#fefefe", fontSize:24,fontWeight:"bold"}}>Change Colors</Text></TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  shape: {
    marginBottom: 20,
    borderWidth:2,
    borderColor:"#f3f3f3"
  }
})