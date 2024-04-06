import { Image, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import React from 'react'

export default function List(props: any) {

    return (
        <TouchableOpacity onPress={()=>Vibration.vibrate(200)} style={styles.contact} key={props?.id}>
            <Image
                style={styles.profileImage}
                source={{
                    uri: props?.image
                }}
            />
            <View style={styles.text}>
                <Text style={styles.name} numberOfLines={1}>{props?.name}</Text>
                <Text style={styles.about} numberOfLines={1}>{props?.status}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    contact: {
        borderBottomColor: "#555",
        borderBottomWidth: 1,
        flexDirection: "row",
        padding: 16,
        gap: 12
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 500,
    },
    text: {
        flex: 1,
        gap: 4,
        padding: 4
    },
    name: {
        color: "#d8d8d8",
        width: "100%",
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 16
    },
    about: {
        color: "#d8d8d8",
        width: "100%",
        textAlign: "left",
        fontSize: 12
    },

})