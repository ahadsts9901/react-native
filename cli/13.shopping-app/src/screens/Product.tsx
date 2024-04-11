import { ActivityIndicator, Image, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Separator from '../components/Separator'

export default function Product({ route }: any) {

  const { id } = route?.params
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    getProduct(id)
  }, [id])

  const openUrl = (url: string) => {
    Linking.openURL(url)
  }

  const getProduct = async (productId: string) => {

    setIsLoading(true)

    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
        setIsLoading(false)
      });

  }

  return (
    <>
      {
        isLoading ?
          <SafeAreaView style={{
            flex: 1,
            backgroundColor: "#fff"
          }}>
            <ActivityIndicator size="large" color="#18171f" style={{
              marginTop: 250
            }} />
          </SafeAreaView>
          : <SafeAreaView style={{
            flex: 1,
            padding: 24,
            gap: 18,
            width: "100%",
            backgroundColor: "#fff",
          }}>
            <Image
              style={{
                width: "100%",
                height: 200,
                objectFit: "contain",
              }}
              source={{
                uri: product ? product?.image : "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }} />
            <Separator vertical={false} />
            <Text numberOfLines={2} style={{
              width: "100%",
              fontFamily: "Quicksand-Bold",
              fontSize: 24,
              textAlign: "left",
              color: "#353535"
            }}>{product?.title}</Text>
            <Text numberOfLines={3} style={{
              width: "100%",
              fontFamily: "Quicksand-Regular",
              fontSize: 16,
              textAlign: "left",
            }}>{product?.description}</Text>
            <View style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 16
            }}>
              <Text style={{
                fontSize: 20,
                padding: 12,
                borderWidth: 2,
                borderColor: "#454545",
                color: "#454545",
                borderRadius: 8,
                width: "45%",
                textAlign: "center",
                fontFamily: "Quicksand-Bold"
              }}>{product?.price.toFixed(1).toLocaleString()} $</Text>
              <TouchableOpacity
                onPress={() => openUrl(`https://wa.me/+923130019086?text=Hi, I am interested in your product https://og-tags-nextjs.vercel.app/product/${id}`)}
                style={{
                  padding: 12,
                  borderWidth: 2,
                  borderColor: "#454545",
                  borderRadius: 8,
                  width: "45%",
                  backgroundColor: "#454545",
                  elevation: 12
                }}>
                <Text style={{
                  fontSize: 20,
                  textAlign: "center",
                  color: "#fff",
                  fontFamily: "Quicksand-Bold"
                }}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
      }
    </>
  )
}

const styles = StyleSheet.create({})