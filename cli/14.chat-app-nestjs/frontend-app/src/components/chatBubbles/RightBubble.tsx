import React from 'react'
import { Text, View } from 'react-native'
import moment from 'moment'

const RightBubble = ({ message, time }: any) => {
    return (
        <>
            <View style={{
                maxWidth: 260,
                minWidth: 100,
                padding: 14,
                backgroundColor: "#f04e5d",
                borderRadius: 12,
                marginTop: 12,
                marginHorizontal: 12,
                marginLeft: "auto",
                gap:6
            }}>
                <Text
                    style={{
                        color: "#fff",
                        fontFamily: "Jost-SemiBold",
                        textAlign: "left",
                        fontSize: 16
                    }}
                >{message}</Text>
                <Text
                    style={{
                        color: "#fff",
                        fontFamily: "Jost-SemiBold",
                        textAlign: "right",
                        fontSize: 14,
                    }}
                >{moment(time).fromNow()}</Text>
            </View>
        </>
    )
}

export default RightBubble