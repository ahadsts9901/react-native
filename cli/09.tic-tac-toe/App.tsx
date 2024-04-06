import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Item from './components/Item'
import Snackbar from 'react-native-snackbar'

export default function App() {

  const [arr, setArr] = useState([null, null, null, null, null, null, null, null, null])
  const [isZeroTurn, setIsZeroTurn] = useState<Boolean>(false)
  const [message, setMessage] = useState<String>("Player O Turn")

  useEffect(() => {

    if (isZeroTurn) {
      setMessage("Player O Turn")
    } else {
      setMessage("Player X Turn")
    }

  }, [isZeroTurn])

  useEffect(() => {

    if (arr[0] == 1 && arr[1] == 1 && arr[2] == 1) {
      setMessage("Player X Won")
      return
    } else if (arr[3] == 1 && arr[4] == 1 && arr[5] == 1) {
      setMessage("Player X Won")
      return
    } else if (arr[6] == 1 && arr[7] == 1 && arr[8] == 1) {
      setMessage("Player X Won")
      return
    } else if (arr[0] == 1 && arr[3] == 1 && arr[6] == 1) {
      setMessage("Player X Won")
      return
    } else if (arr[1] == 1 && arr[4] == 1 && arr[7] == 1) {
      setMessage("Player X Won")
      return
    } else if (arr[2] == 1 && arr[5] == 1 && arr[8] == 1) {
      setMessage("Player X Won")
      return
    } else if (arr[0] == 1 && arr[4] == 1 && arr[8] == 1) {
      setMessage("Player X Won")
      return
    } else if (arr[2] == 1 && arr[4] == 1 && arr[6] == 1) {
      setMessage("Player X Won")
      return
    }

    if (arr[0] == 2 && arr[1] == 2 && arr[2] == 2) {
      setMessage("Player O Won")
      return
    } else if (arr[3] == 2 && arr[4] == 2 && arr[5] == 2) {
      setMessage("Player O Won")
      return
    } else if (arr[6] == 2 && arr[7] == 2 && arr[8] == 2) {
      setMessage("Player O Won")
      return
    } else if (arr[0] == 2 && arr[3] == 2 && arr[6] == 2) {
      setMessage("Player O Won")
      return
    } else if (arr[1] == 2 && arr[4] == 2 && arr[7] == 2) {
      setMessage("Player O Won")
      return
    } else if (arr[2] == 2 && arr[5] == 2 && arr[8] == 2) {
      setMessage("Player O Won")
      return
    } else if (arr[0] == 2 && arr[4] == 2 && arr[8] == 2) {
      setMessage("Player O Won")
      return
    } else if (arr[2] == 2 && arr[4] == 2 && arr[6] == 2) {
      setMessage("Player O Won")
      return
    }

    if (
      arr[0] && arr[1] && arr[2] &&
      arr[3] && arr[4] && arr[5] &&
      arr[6] && arr[7] && arr[8]
    ){
      setMessage("Match Tie")
    }

  }, [isZeroTurn])

  useEffect(()=>{

    switch (message) {
      case "Player X Won":
        Snackbar.show({
          text: `${message}`,
          duration: Snackbar.LENGTH_LONG,
          fontFamily: "Poppins-Bold",
          action: {
            text: '',
          },
        });
        break;
      case "Player O Won":
        Snackbar.show({
          text: `${message}`,
          duration: Snackbar.LENGTH_LONG,
          fontFamily: "Poppins-Bold",
          action: {
            text: '',
          },
        });
        break;
      case "Match Tie":
        Snackbar.show({
          text: `${message}`,
          duration: Snackbar.LENGTH_LONG,
          fontFamily: "Poppins-Bold",
          action: {
            text: '',
          },
        });
        break;
    }

  },[message])

  const resetGame = () => {
    const newArr = [...arr]
    newArr[0] = null
    newArr[1] = null
    newArr[2] = null
    newArr[3] = null
    newArr[4] = null
    newArr[5] = null
    newArr[6] = null
    newArr[7] = null
    newArr[8] = null
    setArr(newArr)
    setMessage("Player O Turn")
    Vibration.vibrate(300)
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#22242a",
        alignItems: "center",
        padding: 24,
      }}>
      <View style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        marginBottom: 24,
      }}>
        <Text style={{
          color: "#fff",
          fontFamily: 'Poppins-Bold',
          fontSize: 32
        }}>Tic</Text>
        <Text style={{
          color: "#1776fd",
          fontFamily: 'Poppins-Bold',
          fontSize: 32
        }}>Tac</Text>
        <Text style={{
          color: "#fff",
          fontFamily: 'Poppins-Bold',
          fontSize: 32
        }}>Toe</Text>
      </View>
      <View style={{
        backgroundColor: "#1b1e22",
        borderRadius: 10,
        padding: 10,
        alignItems: "center"
      }}>
        <View style={{
          flexDirection: "row",
          alignItems: "center"
        }}>
          <Item message={message} state={arr[0]} index={0} arr={arr} setArr={setArr} isZeroTurn={isZeroTurn} setIsZeroTurn={setIsZeroTurn} />
          <Item message={message} state={arr[1]} index={1} arr={arr} setArr={setArr} isZeroTurn={isZeroTurn} setIsZeroTurn={setIsZeroTurn} />
          <Item message={message} state={arr[2]} index={2} arr={arr} setArr={setArr} isZeroTurn={isZeroTurn} setIsZeroTurn={setIsZeroTurn} />
        </View>
        <View style={{
          flexDirection: "row",
          alignItems: "center"
        }}>
          <Item message={message} state={arr[3]} index={3} arr={arr} setArr={setArr} isZeroTurn={isZeroTurn} setIsZeroTurn={setIsZeroTurn} />
          <Item message={message} state={arr[4]} index={4} arr={arr} setArr={setArr} isZeroTurn={isZeroTurn} setIsZeroTurn={setIsZeroTurn} />
          <Item message={message} state={arr[5]} index={5} arr={arr} setArr={setArr} isZeroTurn={isZeroTurn} setIsZeroTurn={setIsZeroTurn} />
        </View>
        <View style={{
          flexDirection: "row",
          alignItems: "center"
        }}>
          <Item message={message} state={arr[6]} index={6} arr={arr} setArr={setArr} isZeroTurn={isZeroTurn} setIsZeroTurn={setIsZeroTurn} />
          <Item message={message} state={arr[7]} index={7} arr={arr} setArr={setArr} isZeroTurn={isZeroTurn} setIsZeroTurn={setIsZeroTurn} />
          <Item message={message} state={arr[8]} index={8} arr={arr} setArr={setArr} isZeroTurn={isZeroTurn} setIsZeroTurn={setIsZeroTurn} />
        </View>
        <Text style={{
          width: "100%",
          fontFamily: message === "Player X Won" ? "Poppins-Bold" : message === "Player O Won" ? "Poppins-Bold" : message === "Match Tie" ? "Poppins-Bold" : "Poppins-SemiBold",
          textAlign: "center",
          fontSize: 18,
          marginVertical: 6,
          color: message === "Player X Won" ? "#f7ff80" : message === "Player O Won" ? "#f7ff80" : message === "Match Tie" ? "#f7ff80" : "#fff",
        }}>{message}</Text>
      </View>
      <TouchableOpacity style={{
        width: "90%",
        padding: 12,
        backgroundColor: "#1776fd",
        borderRadius: 12,
        marginTop: 24
      }} onPress={resetGame}>
        <Text style={{
          fontFamily: "Poppins-Bold",
          color: "#fff",
          fontSize: 24,
          textAlign: "center"
        }}>Restart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})