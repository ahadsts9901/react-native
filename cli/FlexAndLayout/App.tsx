import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FlatCards from './components/Flatcard'
import ElevatedCards from './components/ElevatedCards'
import TrendingPlaces from './components/TrendingPlaces'
import BlogCard from './components/BlogCard'
import ContactList from './components/ContactList'

export default function App() {
  return (
    <SafeAreaView style={styles.bg}>
      <ImageBackground style={styles.bg}
      source={{
        uri:"https://www.aicarz.com/_next/static/media/dontbg.87ef13c1.png"
      }}
      >
        <ScrollView>
          <FlatCards />
          <ElevatedCards />
          <TrendingPlaces />
          <BlogCard />
          <ContactList />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bg: {
    flex: 1
  }
})