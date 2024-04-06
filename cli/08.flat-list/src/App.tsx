import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { users } from './data'
import List from './components/List'

export default function App() {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#232527",
      padding: 12
    }}>
      <StatusBar />
      <FlatList
        data={users}
        keyExtractor={user => user.id}
        renderItem={({ item }: any) => (
          <List
            name={item?.name}
            status={item?.status}
            image={item?.imageUrl}
          />
        )
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})