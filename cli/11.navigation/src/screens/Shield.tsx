import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default function Shield({ navigation }: any) {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#050505",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Icon name="shield-outline" size={56} color="#f25901" />
      <Text style={{
        color: "#fcfcfc",
        fontFamily: "Jost-ExtraBold",
        fontSize: 40,
        marginTop: 18,
      }}>Shield</Text>
      <TouchableOpacity style={{
        backgroundColor: "#f25901",
        width: 250,
        padding: 12,
        borderRadius: 12,
        marginTop: 24,
      }}
        // onPress={()=>navigation.navigate('egg')}
        onPress={() => navigation.navigate('egg', { data: "someData" })}
        // onPress={() => navigation.push('egg')}
      ><Text
        style={{
          color: "#fcfcfc",
          fontFamily: "Jost-ExtraBold",
          textAlign:"center",
          fontSize:18
        }}
      >Go to egg screen</Text></TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})