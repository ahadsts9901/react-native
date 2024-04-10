import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default function Card({ title, content, icon }: any) {
    return (
        <View style={{
            height: 170,
            width: 200,
            padding:16,
            backgroundColor: "#fff",
            margin: 16,
            borderRadius: 16,
            elevation: 8,
            alignItems:"center",
        }}>
            <Icon name={icon} size={56} color="#666" />
            <Text style={{
                width:"100%",
                textAlign:"center",
                fontFamily:"Jost-SemiBold",
                fontSize:24,
                color:"#666"
            }}>{title}</Text>
            <Text style={{
                width:"100%",
                textAlign:"center",
                fontFamily:"Jost-SemiBold",
                fontSize:32,
                color:"#ff8800"
            }}>{content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})