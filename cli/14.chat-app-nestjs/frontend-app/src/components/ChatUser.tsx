import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import user from "../../assets/images/user.png"
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

export default function ChatUser({ item }: any) {

    const { userName, _id } = item
    const currentUser: { _id: string } = useSelector((state: any) => state.user)

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
                fontSize: 20,
                color: "#555",
                fontFamily: "Jost-SemiBold"
            }}>@{userName} {
                currentUser?._id === _id ? "(You)" : null
            }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})