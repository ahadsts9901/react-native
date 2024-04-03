import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ElevatedCards() {
    return (
        <View style={styles.main}>
            <Text style={styles.heading}>ELevated Cards</Text>
            <ScrollView horizontal style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.text}>Red</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.text}>Green</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.text}>Orange</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.text}>Blue</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.text}>Pink</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.text}>Yellow</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.text}>Purple</Text>
                </View>
            </ScrollView>
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
        height: 120,
        width: "100%",
        flexDirection: "row",
    },
    card: {
        height: 100,
        width: 120,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        backgroundColor: "#fefefe",
        margin: 6,
        elevation: 12,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowColor: "#fff",
        shadowOpacity: 0.8,
        shadowRadius: 12
    },
    text: {
        color: "#333",
        fontWeight: "bold",
    },
})