import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function TrendingPlaces() {
    return (
        <View style={styles.main}>
            <Text style={styles.heading}>Trending Places</Text>
            <View style={styles.cardCont}>
                <View style={[styles.card, styles.elevated]}>
                    <Image source={{
                        uri: "https://images.unsplash.com/photo-1622546758596-f1f06ba11f58?q=80&w=1221&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }}
                        style={styles.image}
                    />
                    <Text style={styles.cardTitle}>Minar-e-Pakistan</Text>
                    <Text style={styles.cardAbout}>Located at Lahore, Pakistan</Text>
                    <Text style={styles.cardDesc}>
                        The first official call for a 
                        separate and independent homeland 
                        for the Muslims of British India, 
                        as espoused by the two-nation theory.
                    </Text>
                    <Text style={styles.cardLocation}>Public place</Text>
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
        height: 450,
        backgroundColor: "#fefefe",
        borderRadius: 8,
        marginVertical: 8,
    },
    image: {
        width: "100%",
        height: 200,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
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
        fontSize: 24,
        fontWeight: "bold",
        color: "#353535",
        paddingVertical: 12,
        paddingTop:12,
        paddingHorizontal: 12,
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
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    cardLocation: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#353535",
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
})