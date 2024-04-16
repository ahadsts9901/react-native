import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { baseUrl } from '../core'

export default function Chat({ route }: any) {

  const navigation = useNavigation()

  const [user, setUser] = useState<any>(null)
  const currentUser = useSelector((state: any) => state?.user)

  useEffect(() => {

    getChat(route?.params?._id)

  }, [route?.params?._id])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: user?.firstName
    })
  }, [])

  const getChat = async (id: string) => {

    const response = await axios.get(`${baseUrl}/api/chat/${id}`)

  }

  return (
    <></>
    // <FlatList  />
  )
}

const styles = StyleSheet.create({})