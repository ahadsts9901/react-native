import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Separator({ vertical }: any) {
    return (
        <View style={{
            width: vertical ? null : "100%",
            height: vertical ? "100%" : null,
            borderColor: "#ddd",
            borderWidth: 1,
        }}></View>
    )
}

const styles = StyleSheet.create({})