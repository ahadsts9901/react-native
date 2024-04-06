import { StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function Item({ state, index, arr, setArr, isZeroTurn, setIsZeroTurn, message }: any) {

    const [symbol, setSymbol] = useState<String>()

    useEffect(() => {
        switch (state) {
            case null:
                setSymbol("")
                break;
            case 1:
                setSymbol("x")
                break;
            case 2:
                setSymbol("o")
                break;
        }
    }, [arr])

    const setFun = () => {

        if(message === "Player X Won" || message === "Player O Won" || message === "Match Tie") return

        if (!arr[index]) {
            if (isZeroTurn) {
                setSymbol("O")
            } else {
                setSymbol("X")
            }
            const newArr = [...arr]
            if (isZeroTurn) {
                newArr[index] = 2
                setArr(newArr)
            }else{
                newArr[index] = 1
                setArr(newArr)
            }
            setIsZeroTurn(!isZeroTurn)
            Vibration.vibrate(200)
        }
    }

    return (
        <TouchableOpacity style={{
            width: 70,
            height: 70,
            margin: 10,
            padding: 10,
            backgroundColor: "#22242a",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center"
        }} onPress={setFun}>
            <Text style={{
                fontFamily: "Poppins-Bold",
                color: "#fff",
                fontSize: 24
            }}>{symbol}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})