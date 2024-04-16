import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import user from "../../assets/images/user.png"
import { useNavigation } from '@react-navigation/native'

export default function ChatUser({ item }: any) {

    const { firstName, _id } = item

    const navigation: any = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.navigate("Chat", { _id: _id })} style={{
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            gap: 18,
            padding: 18
        }}>
            <Image source={user} style={{
                width: 50,
                height: 50,
                borderRadius: 200,
                opacity: 0.6
            }} />
            <Text style={{
                width: "100%",
                fontSize: 18,
                color: "#555",
                fontFamily: "Jost-SemiBold"
            }}>{firstName}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})