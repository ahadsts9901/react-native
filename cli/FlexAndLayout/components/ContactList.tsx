import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ContactList() {

    const contacts = [
        {
            id: 1,
            name: "Inzamam Malik",
            status: "Full Stack & AI Chatbot Developer",
            imageUrl: "https://avatars.githubusercontent.com/u/14273842?v=4"
        },
        {
            id: 2,
            name: "Abdul Ahad",
            status: "MERN Stack Developer",
            imageUrl: "https://avatars.githubusercontent.com/u/120649081?v=4"
        },
        {
            id: 3,
            name: "Faraz Tariq",
            status: "React Native Developer",
            imageUrl: "https://avatars.githubusercontent.com/u/121194586?v=4"
        },
        {
            id: 4,
            name: "Bilal Zafar",
            status: "MERN Stack Developer",
            imageUrl: "https://avatars.githubusercontent.com/u/115065049?v=4"
        },
    ]

    return (
        <View style={styles.main}>
            <Text style={styles.heading}>Contacts</Text>
            <View style={styles.contacts}>
                {
                    contacts.map((contact: any) => (
                        <View style={styles.contact} key={contact?.id}>
                            <Image
                                style={styles.profileImage}
                                source={{
                                    uri: contact?.imageUrl
                                }}
                            />
                            <View style={styles.text}>
                                <Text style={styles.name} numberOfLines={1}>{contact?.name}</Text>
                                <Text style={styles.about} numberOfLines={1}>{contact?.status}</Text>
                            </View>
                        </View>
                    ))
                }
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
    contacts: {
        width: "100%",
    },
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
        flex:1,
        gap:4,
        padding:4
    },
    name: {
        color:"#d8d8d8",
        width:"100%",
        textAlign:"left",
        fontWeight:"bold",
        fontSize: 16
    },
    about: {
        color:"#d8d8d8",
        width:"100%",
        textAlign:"left",
        fontSize: 12
    },

})