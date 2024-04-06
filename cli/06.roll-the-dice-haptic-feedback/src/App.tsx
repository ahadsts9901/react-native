import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import wave from "./assets/wave.png"

import secondary1 from "./assets/secondary-1.png"
import secondary2 from "./assets/secondary-2.png"
import secondary3 from "./assets/secondary-3.png"
import secondary4 from "./assets/secondary-4.png"
import secondary5 from "./assets/secondary-5.png"
import secondary6 from "./assets/secondary-6.png"

import primary1 from "./assets/primary-1.png"
import primary2 from "./assets/primary-2.png"
import primary3 from "./assets/primary-3.png"
import primary4 from "./assets/primary-4.png"
import primary5 from "./assets/primary-5.png"
import primary6 from "./assets/primary-6.png"

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function App() {

  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const [dice1, setDice1]: any = useState()
  const [dice2, setDice2]: any = useState()

  useEffect(() => {
    rollDice()
  }, [])

  const rollDice = () => {

    const dice1Num = Math.ceil(Math.random() * 6)

    switch (dice1Num) {
      case 1:
        setDice1(secondary1)
        break;
      case 2:
        setDice1(secondary2)
        break;
      case 3:
        setDice1(secondary3)
        break;
      case 4:
        setDice1(secondary4)
        break;
      case 5:
        setDice1(secondary5)
        break;
      case 6:
        setDice1(secondary6)
        break;
    }

    const dice2Num = Math.ceil(Math.random() * 6)

    switch (dice2Num) {
      case 1:
        setDice2(primary1)
        break;
      case 2:
        setDice2(primary2)
        break;
      case 3:
        setDice2(primary3)
        break;
      case 4:
        setDice2(primary4)
        break;
      case 5:
        setDice2(primary5)
        break;
      case 6:
        setDice2(primary6)
        break;
    }

    Vibration.vibrate(400)
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#F4EEE9",
      alignItems: "center"
    }}>
      <ImageBackground source={wave}
        style={{
          width: "100%",
          height: 230,
          marginBottom: 20,
        }}/>
      <View style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 20
      }}>
        <Image source={dice2} style={{
          width: 100,
          height: 100,
          marginBottom: 20,
        }} />
        <Image source={dice1} style={{
          width: 100,
          height: 100,
          marginBottom: 20,
        }} />
      </View>
      <TouchableOpacity
        onPress={rollDice}
        style={{
          backgroundColor: "#353535",
          padding: 16,
          paddingHorizontal: 24,
          borderRadius: 12,
          marginTop:24
        }}><Text style={{
          color: "#F4EEE9",
          fontWeight: "bold",
          fontSize: 24
        }}>Roll Dice</Text></TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})