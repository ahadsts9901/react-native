import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from '@react-navigation/native'

export default function Egg({ route }: any) {

  // console.log(route); // data passed from previous screen

  const navigation: any = useNavigation()

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#050505",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Icon name="egg-outline" size={56} color="#f25901" />
      <Text style={{
        color: "#fcfcfc",
        fontFamily: "Jost-ExtraBold",
        fontSize: 40,
        marginTop: 18
      }}>Egg</Text>
      <TouchableOpacity style={{
        backgroundColor: "#f25901",
        width: 250,
        padding: 12,
        borderRadius: 12,
        marginTop: 24,
      }}
        onPress={() => navigation.goBack()}
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
      <TouchableOpacity style={{
        backgroundColor: "#f25901",
        width: 250,
        padding: 12,
        borderRadius: 12,
        marginTop: 24,
      }}
        onPress={() => navigation.navigate("carrot")}
      ><Text
        style={{
          color: "#fcfcfc",
          fontFamily: "Jost-ExtraBold",
          textAlign:"center",
          fontSize:18
        }}
      >Go to carrot screen</Text></TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})