import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import wave from "../../assets/images/wave.png"
import { useNavigation } from '@react-navigation/native'
import { baseUrl, emailPattern } from '../core'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export default function Login() {

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigation: any = useNavigation()

  const login = async () => {

    if (!email || email.trim() === "") {
      setErrorMessage("Email is required")
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
      return
    }

    if (!emailPattern.test(email)) {
      setErrorMessage("Email is invalid")
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
      return
    }

    if (!password || password.trim() === "") {
      setErrorMessage("Password is required")
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
      return
    }

    try {

      setIsLoading(true)

      const resp = await axios.post(
        `${baseUrl}/api/auth/login`,
        {
          email: email,
          password: password
        },
        { withCredentials: true }
      )

      await AsyncStorage.setItem('hart', resp?.data?.data)

      setIsLoading(false)

      navigation.navigate("Home")

    } catch (error: any) {
      console.log(error);
      setIsLoading(false)
      setErrorMessage(error?.response?.data?.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000);
    }

  }

  const stop = () => {
    return
  }

  return (
    <>
      {
        errorMessage && <View style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 16,
          paddingHorizontal: 16,
          position: "absolute",
          top: 0,
          zIndex: 20,
          justifyContent: "center",
        }}>
          <Text style={{
            width: "100%",
            backgroundColor: "#fff",
            padding: 12,
            borderRadius: 8,
            borderColor: "#ed4337",
            borderWidth: 1,
            elevation: 5,
            color: "#ed4337",
            fontFamily: "Jost-SemiBold",
            fontSize: 20,
            textAlign: "center",
            textTransform: "capitalize"
          }}>{errorMessage}</Text>
        </View>
      }
      <ScrollView contentContainerStyle={{
        justifyContent: "space-between",
        gap: 32,
      }} style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingBottom: 16
      }}>
        <Image source={wave} style={{
          width: "100%",
          height: 100,
        }} />
        <View style={{ width: "100%", paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: "Jost-Bold", fontSize: 36, color: "#444" }}>Login</Text>
          <Text style={{ fontFamily: "Jost-SemiBold", fontSize: 16, color: "#8e8e8e" }}>Please signin to continue</Text>
        </View>
        <View style={{ width: "100%", paddingHorizontal: 20, flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Icon name="email-open-multiple-outline" size={28} color="#8e8e8e" />
          <TextInput placeholder='Email'
            onChangeText={(val) => setEmail(val)}
            style={{ width: "100%", flex: 1, color: "#444", fontFamily: "Jost-SemiBold", fontSize: 18 }} />
        </View>
        <View style={{ width: "100%", paddingHorizontal: 20, flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Icon name="lock-outline" size={28} color="#8e8e8e" />
          <TextInput secureTextEntry={!showPassword} placeholder='Password'
            onChangeText={(val) => setPassword(val)}
            style={{ width: "100%", color: "#444", flex: 1, fontFamily: "Jost-SemiBold", fontSize: 18 }} />
          <Icon name={showPassword ? "eye" : "eye-off"} size={28} color="#8e8e8e"
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
        <View style={{ width: "100%", flexDirection: "row-reverse", paddingHorizontal: 24 }}>
          <TouchableOpacity
            onPress={isLoading ? stop : login}
            style={{ width: 180, backgroundColor: isLoading ? "#555" : "#f04e5d", borderRadius: 100, padding: 8, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}>
            <Text style={{ fontFamily: "Jost-SemiBold", fontSize: 20, color: "#fff" }}>
              {
                isLoading ? "Processing" : "Login"
              }
            </Text>
            {
              isLoading ? <ActivityIndicator color="#fff" size="small" />
                : <Icon name="arrow-right-thick" size={28} color="#fff" />
            }
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", flexDirection: "row", marginTop: 24, justifyContent: "center", alignItems: "center", gap: 8, }}>
          <Text style={{ fontFamily: "Jost-SemiBold", color: "#8e8e8e", fontSize: 18 }}>Dont have an account ?</Text>
          <Text style={{ fontFamily: "Jost-Bold", color: "#f04e5d", fontSize: 18 }}
            onPress={() => navigation.navigate("Signup")}
          >Signup</Text>
        </View>
      </ScrollView>
    </>
  )
}