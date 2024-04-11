import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Card from '../components/Card'

export default function Home() {

  const navigation = useNavigation()

  const [products, setProducts] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    setIsLoading(true)
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setIsLoading(false)
      });
  };

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: "#fdfdfd"
    }}>
      {
        isLoading ?
          <ActivityIndicator color="#18171f" size="large"
            style={{
              marginTop: 200
            }}
          />
          :
          <FlatList
          style={{
            padding:12,
          }}
            data={products}
            keyExtractor={products?.id}
            renderItem={({ item }:any)=>(
              <Card data={item} />
            )}
        />
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({})