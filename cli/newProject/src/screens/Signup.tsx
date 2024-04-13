import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import MIcon from "react-native-vector-icons/MaterialIcons"
import wave from "../../assets/images/wave.png"
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { baseUrl, emailPattern } from '../core'
import axios from 'axios'

export default function Signup() {

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")

  const navigation: any = useNavigation()

  const signup = async () => {

    if (!username || username.trim() === "") {
      setErrorMessage("Username is required")
      setTimeout(() => {
        setErrorMessage(null)
      }, 1500)
      return
    }

    if (!email || email.trim() === "") {
      setErrorMessage("Email is required")
      setTimeout(() => {
        setErrorMessage(null)
      }, 1500)
      return
    }

    if (!emailPattern.test(email)) {
      setErrorMessage("Email is invalid")
      setTimeout(() => {
        setErrorMessage(null)
      }, 1500)
      return
    }

    if (!password || password.trim() === "") {
      setErrorMessage("Password is required")
      setTimeout(() => {
        setErrorMessage(null)
      }, 1500)
      return
    }

    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match")
      setTimeout(() => {
        setErrorMessage(null)
      }, 1500)
      return
    }

    try {
      setIsLoading(true)
      const resp = await axios.post(
        `${baseUrl}/api/auth/signup`,
        {
          email: email,
          password: password,
          firstName: username,
          lastName: "null"
        },
        { withCredentials: true }
      )
      
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
        gap: 16,
      }} style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingBottom: 24,
        height: 500,
      }}>
        <Image source={wave} style={{
          width: "100%",
          height: 100,
        }} />
        <View style={{ width: "100%", paddingHorizontal: 24 }}>
          <Text style={{ fontFamily: "Jost-Bold", fontSize: 36, color: "#444" }}>Create Account</Text>
        </View>
        <View style={{ width: "100%", paddingHorizontal: 24, flexDirection: "row", alignItems: "center", gap: 12 }}>
          <MIcon name="person-outline" size={28} color="#888" />
          <TextInput placeholder='Username'
            onChangeText={(val) => setUsername(val)}
            style={{ width: "100%", fontSize: 18, flex: 1, color: "#444", fontFamily: "Jost-SemiBold" }} />
        </View>
        <View style={{ width: "100%", paddingHorizontal: 24, flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Icon name="email-open-multiple-outline" size={28} color="#888" />
          <TextInput placeholder='Email'
            onChangeText={(val) => setEmail(val)}
            style={{ width: "100%", fontSize: 18, color: "#444", flex: 1, fontFamily: "Jost-SemiBold" }} />
        </View>
        <View style={{ width: "100%", paddingHorizontal: 24, flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Icon name="lock-outline" size={28} color="#888" />
          <TextInput secureTextEntry={!showPassword} placeholder='Password'
            onChangeText={(val) => setPassword(val)}
            style={{ width: "100%", fontSize: 18, flex: 1, color: "#444", fontFamily: "Jost-SemiBold" }} />
          <Icon name={showPassword ? "eye" : "eye-off"} size={28} color="#888"
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
        <View style={{ width: "100%", paddingHorizontal: 24, flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Icon name="lock-outline" size={28} color="#888" />
          <TextInput secureTextEntry={!showRepeatPassword} placeholder='Password'
            onChangeText={(val) => setRepeatPassword(val)}
            style={{ width: "100%", fontSize: 18, flex: 1, color: "#444", fontFamily: "Jost-SemiBold" }} />
          <Icon name={showRepeatPassword ? "eye" : "eye-off"} size={28} color="#888"
            onPress={() => setShowRepeatPassword(!showRepeatPassword)}
          />
        </View>
        <View style={{ width: "100%", flexDirection: "row-reverse", paddingHorizontal: 24 }}>
          <TouchableOpacity
            onPress={signup}
            style={{ width: 180, backgroundColor: isLoading ? "#555" : "#f04e5d", borderRadius: 100, padding: 8, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 }}>
            <Text style={{ fontFamily: "Jost-SemiBold", fontSize: 20, color: "#fff" }}>
              {
                isLoading ? "Processing" : "Signup"
              }
            </Text>
            {
              isLoading ? <ActivityIndicator size="small" color="#fff" />
                : <Icon name="arrow-right-thick" size={28} color="#fff" />
            }
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", flexDirection: "row", marginTop: 16, justifyContent: "center", alignItems: "center", gap: 8, }}>
          <Text style={{ fontFamily: "Jost-SemiBold", color: "#888", fontSize: 18 }}>Already have an account ?</Text>
          <Text style={{ fontFamily: "Jost-Bold", color: "#f04e5d", fontSize: 18 }}
            onPress={() => navigation.navigate("Login")}
          >Login</Text>
        </View>
      </ScrollView>
    </>
  )

}