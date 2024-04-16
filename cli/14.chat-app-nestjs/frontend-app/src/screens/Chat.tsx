import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { baseUrl } from '../core'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RightBubble from '../components/chatBubbles/RightBubble'
import LeftBubble from '../components/chatBubbles/LeftBubble'
import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';

export default function Chat({ route }: any) {

  const navigation = useNavigation()

  const currentUser = useSelector((state: any) => state?.user)

  const [user, setUser] = useState<any>(null)
  const [inputHeight, setInputHeight] = useState<number>(0);
  const [messageText, setMessageText] = useState<string>("")
  const [messages, setMessages] = useState<any[]>([])

  const scrollViewRef: any = useRef()

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages])

  useEffect(() => {
    pusherSocket()
  }, [])

  useEffect(() => {
    pusherSocket()
  }, [currentUser])

  const pusherSocket = async () => {
    const pusher = Pusher.getInstance();

    await pusher.init({
      apiKey: "9b362b3f13fbb0eb6312",
      cluster: "ap2"
    });

    await pusher.connect();
    await pusher.subscribe({
      channelName: `user:${currentUser?._id}:message`,
      onEvent: (event: PusherEvent) => {
        console.log(`Event received: ${event}`);
      }
    });

  }

  const handleContentSizeChange = (e: any) => {
    setInputHeight(Math.min(e.nativeEvent.contentSize.height, 18 * 4 * 1.5));
  };

  useEffect(() => {

    getChat(route?.params?._id)
    getUser(route?.params?._id)

  }, [route?.params?._id])

  useEffect(() => {
    navigation.setOptions({
      headerTitle: user?.userName ? `@${user?.userName}` : "",
    })
  }, [user])

  const getUser = async (id: string) => {

    try {
      const resp = await axios.get(`${baseUrl}/api/auth/user/${id}`)
      setUser(resp.data.data)
    } catch (error) {
      console.log(error)
    }

  }

  const getChat = async (id: string) => {

    try {
      const response = await axios.get(`${baseUrl}/api/chat/${id}`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${await AsyncStorage.getItem("hart")}`
        }
      })

      setMessages(response?.data?.data)

    } catch (error) {
      console.log(error);
    }

  }

  const message = async () => {

    if (!messageText || messageText.trim() === "") return
    if (!currentUser?._id || currentUser?._id.trim() === "") return
    if (!user?._id || user?._id.trim() === "") return

    try {

      const resp = await axios.post(`${baseUrl}/api/chat`, {
        to_id: user?._id,
        from_id: currentUser?._id,
        message: messageText
      }, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${await AsyncStorage.getItem("hart")}`
        }
      })

      setMessageText("")
      getChat(user?._id)

    } catch (error: any) {
      console.log(error.response.data.message)
    }

  }

  return (
    <>
      <ScrollView ref={scrollViewRef} style={{
        flex: 1,
        backgroundColor: "#fff",
      }}>
        {
          !messages.length ? null :
            messages?.map((message: any, i: number) => (
              (message?.from_id === currentUser?._id) ?
                <RightBubble
                  key={i}
                  message={message?.message}
                  time={message?.time}
                /> : <LeftBubble
                  key={i}
                  message={message?.message}
                  time={message?.time}
                />
            ))
        }
        <View style={{ height: 80 }}></View>
      </ScrollView>
      <View
        style={{
          width: '100%',
          padding: 12,
          position: 'absolute',
          bottom: 0,
          maxHeight: 18 * 4 * 2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          backgroundColor: "#fff"
        }}>
        <TextInput
          value={messageText}
          onChangeText={(val) => setMessageText(val)}
          placeholder='Type a message...'
          multiline
          style={{
            fontFamily: 'Jost-SemiBold',
            fontSize: 18,
            flex: 1,
            height: Math.max(18 * 1.8, inputHeight),
            borderColor: "#ddd",
            borderWidth: 1,
            paddingVertical: 12,
            paddingHorizontal: 18,
            borderRadius: 24,
            backgroundColor: "#fff",
            color: "#555"
          }}
          onContentSizeChange={handleContentSizeChange}
        />
        <TouchableOpacity onPress={message}>
          <Icon name='send' color="#f04e5d" size={32} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({})