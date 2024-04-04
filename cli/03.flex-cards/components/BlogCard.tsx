import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function TrendingPlaces() {

    const openUrl = (url: string) => {
        Linking.openURL(url)
    }

    return (
        <View style={styles.main}>
            <Text style={styles.heading}>Trending Places</Text>
            <View style={styles.cardCont}>
                <View style={[styles.card, styles.elevated]}>
                    <Text style={styles.cardTitle}>What is space? - 04 March 2024</Text>
                    <Image source={{
                        uri: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }}
                        style={styles.image}
                    />
                    <Text style={styles.cardDesc} numberOfLines={4}>
                        The universe is the entirety of space,
                        time, matter, and energy,
                        including all galaxies, stars,
                        planets, and living beings.
                        It is boundless and continually
                        expanding, governed by natural
                        laws and forces. Scientists
                        explore the universe to
                        unravel its mysteries and
                        understand the fundamental
                        principles that shape
                        our existence.
                    </Text>
                    <View style={styles.touchCont}>
                        <TouchableOpacity
                            style={styles.touchable}
                            onPress={() => openUrl("https://github.com/ahadsts9901")}
                        ><Text style={styles.cardTouch}>Visit Github Account</Text></TouchableOpacity>
                    </View>
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
    cardCont: {
        width: "100%",
        alignItems: "center",
    },
    card: {
        width: "98%",
        height: 420,
        backgroundColor: "#fefefe",
        borderRadius: 8,
        marginVertical: 8,
    },
    image: {
        width: "100%",
        height: 200,
    },
    elevated: {
        elevation: 12,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowColor: "#fff",
        shadowOpacity: 0.8,
        shadowRadius: 12
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#353535",
        paddingVertical: 18,
        paddingHorizontal: 12,
        textAlign: "center"
    },
    cardAbout: {
        fontSize: 16,
        color: "#353535",
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    cardDesc: {
        fontSize: 14,
        color: "#666",
        paddingTop: 12,
        paddingHorizontal: 12,
    },
    touchCont:{
        flex:1,
        flexDirection:"row",
        justifyContent: "space-around",
        alignItems:"center",
        paddingVertical: 12,
    },
    touchable:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    cardTouch: {
        fontSize: 16,
        fontWeight: "bold",
        paddingHorizontal: 12,
        color: "#0099ff"
    },
})