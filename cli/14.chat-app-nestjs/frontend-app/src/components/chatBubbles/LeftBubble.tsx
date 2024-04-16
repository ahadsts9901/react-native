import React from 'react'
import { Text, View } from 'react-native'
import moment from 'moment'

const LeftBubble = ({ message, time }: any) => {
    return (
        <>
            <View style={{
                maxWidth: 260,
                minWidth: 100,
                padding: 14,
                backgroundColor: "#ededed",
                borderRadius: 12,
                marginTop: 12,
                marginHorizontal: 12,
                marginRight: "auto",
                gap: 6
            }}>
                <Text
                    style={{
                        color: "#454545",
                        fontFamily: "Jost-SemiBold",
                        textAlign: "left",
                        fontSize: 16
                    }}
                >{message}</Text>
                <Text
                    style={{
                        color: "#454545",
                        fontFamily: "Jost-SemiBold",
                        textAlign: "right",
                        fontSize: 14,
                    }}
                >{moment(time).fromNow()}</Text>
            </View>
        </>
    )
}

export default LeftBubble