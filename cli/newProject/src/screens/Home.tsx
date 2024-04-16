import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import { baseUrl } from '../core'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ChatUser from '../components/ChatUser'

export default function Home() {

  const currentUser = useSelector((state: { user: {} }) => state.user)

  const [users, setUsers] = useState<any>([])
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {

    const getToken = async () => setToken(await AsyncStorage.getItem("hart"))

    getToken()

  }, [])

  const getUsers = async () => {

    try {
      const resp = await axios.get(`${baseUrl}/api/auth/users`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setUsers(resp?.data?.data)
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#fff"
    }}>
      <FlatList
        data={users}
        keyExtractor={item => item?._id}
        renderItem={({ item }: any) => (
          <ChatUser item={item} />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})