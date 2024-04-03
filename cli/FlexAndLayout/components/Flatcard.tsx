import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FlatCards() {
    return (
        <View style={styles.main}>
            <Text style={styles.heading}>Flat Cards</Text>
            <View style={styles.container}>
                <View style={[styles.card, styles.red]}>
                    <Text style={styles.text}>Red</Text>
                </View>
                <View style={[styles.card, styles.blue]}>
                    <Text style={styles.text}>Blue</Text>
                </View>
                <View style={[styles.card, styles.green]}>
                    <Text style={styles.text}>Green</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        gap: 16,
        padding: 12
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fefefe",
        paddingHorizontal: 8
    },
    container: {
        height: 100,
        width:"100%",
        flexDirection:"row",
        gap:12,
    },
    card: {
        height: 100,
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 6
    },
    text: {
        color: "#333",
        fontWeight:"bold",
    },
    red: {
        backgroundColor:"#ff7070"
    },
    blue: {
        backgroundColor:"#70b8ff"
    },
    green: {
        backgroundColor:"#99ffa5"
    },
})