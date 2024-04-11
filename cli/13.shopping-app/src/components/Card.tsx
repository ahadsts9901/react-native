import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Separator from './Separator'
import { useNavigation } from '@react-navigation/native'

export default function Card({ data }: any) {

    const navigation: any = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Product", { id: data?.id })}
            style={{
                width: "100%",
                height: 150,
                padding: 12,
                borderRadius: 12,
                borderColor: "#dedede",
                borderWidth: 1,
                marginVertical: 6,
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
            }}>
            <Image source={{
                uri: data?.image
            }}
                style={{
                    width: 120,
                    height: "100%",
                    objectFit: "contain",
                }}
            />
            <Separator vertical />
            <View style={{
                gap: 12,
                width: 150
            }}>
                <Text numberOfLines={1} style={{
                    fontFamily: "Quicksand-Bold",
                    fontSize: 18,
                    color: "#666"
                }}>{data?.title}</Text>
                <Text numberOfLines={2} style={{
                    fontFamily: "Quicksand-Regular",
                    fontSize: 16,
                    color: "#666"
                }}>{data?.title}</Text>
                <Text
                    style={{
                        fontFamily: "Quicksand-Bold",
                        fontSize: 20,
                        color: "#555"
                    }}
                >{data?.price.toFixed(1).toLocaleString()} $</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})