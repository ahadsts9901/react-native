import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from '@react-navigation/native'

export default function Carrot({ route }: any) {

  // console.log(route); // data passed from previous screen

  const navigation: any = useNavigation()

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#050505",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Icon name="carrot" size={56} color="#f25901" />
      <Text style={{
        color: "#fcfcfc",
        fontFamily: "Jost-ExtraBold",
        fontSize: 40,
        marginTop: 18
      }}>Carrot</Text>
      <TouchableOpacity style={{
        backgroundColor: "#f25901",
        width: 250,
        padding: 12,
        borderRadius: 12,
        marginTop: 24,
      }}
        // onPress={() => navigation.goBack()}
        onPress={() => navigation.pop()}
      ><Text
        style={{
          color: "#fcfcfc",
          fontFamily: "Jost-ExtraBold",
          textAlign:"center",
          fontSize:18
        }}
      >Go back</Text></TouchableOpacity>
      <TouchableOpacity style={{
        backgroundColor: "#f25901",
        width: 250,
        padding: 12,
        borderRadius: 12,
        marginTop: 24,
      }}
        onPress={() => navigation.popToTop()}
      ><Text
        style={{
          color: "#fcfcfc",
          fontFamily: "Jost-ExtraBold",
          textAlign:"center",
          fontSize:18
        }}
      >Go to first screen</Text></TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})