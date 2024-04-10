import React, { useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Icon from "react-native-vector-icons/MaterialIcons"
import Card from './components/Card';

export default function App() {

  const [weather, setWeather] = useState<any>(null)
  const [cityName, setCityName] = useState<string>("")
  const [notFound, setNotFound] = useState<boolean>(false)

  useEffect(() => {
    getWeatherFromLocation();
  }, []);

  const getWeatherFromLocation = async () => {

    Geolocation.requestAuthorization();

    Geolocation.getCurrentPosition(async (position) => {

      // weather api call

      let API_KEY = "e0f99c494c2ce394a18cc2fd3f100543";

      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position?.coords?.latitude}&lon=${position?.coords?.longitude}&APPID=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(resp => {
          if (resp.cod === "404") {
            setNotFound(true)
            return;
          } else {
            setNotFound(false)
            setWeather(resp)
          }
        });

    }, (error) => {
      console.error(error);
    },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

  };

  const getWeatherFromSearch = async () => {

    let API_KEY = "e0f99c494c2ce394a18cc2fd3f100543";

    if (!cityName || cityName.trim() === "") return

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName.trim()}&appid=${API_KEY}&units=metric`)
      .then((res) => res.json())
      .then((resp) => {
        if (resp.cod === "404") {
          setNotFound(true)
          return;
        } else {
          setNotFound(false)
          setWeather(resp)
        }
      });

  }

  return (
    
    <ScrollView contentContainerStyle={{
      alignItems: "flex-end",
      gap: 24,
    }} style={{
      backgroundColor: "#f5f5f5"
    }}>
      <View style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        flexWrap: "wrap",
        marginTop: 24,
        paddingHorizontal: 24
      }}>
        <Icon name="cloud-queue" size={48} color="#ff8800" />
        <Text style={{
          fontSize: 32,
          color: "#444",
          fontFamily: "Jost-SemiBold"
        }}>Weather</Text>
        <Text style={{
          fontSize: 32,
          color: "#ff8800",
          fontFamily: "Jost-SemiBold"
        }}>App</Text>
      </View>
      <View style={{
        paddingHorizontal: 12
      }}>
        <View style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          paddingVertical: 10,
          paddingHorizontal: 24,
          paddingRight: 10,
          backgroundColor: "#fff",
          borderRadius: 100,
          elevation: 40
        }}>
          <TextInput placeholder='Enter City Name...'
            onChangeText={(val) => setCityName(val)}
            style={{
              flex: 1,
              fontSize: 20,
              color: "#444",
              fontFamily: "Jost-SemiBold"
            }} />
          <TouchableOpacity
            onPress={getWeatherFromSearch}
            style={{
              backgroundColor: "#ff8800",
              paddingVertical: 6,
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
            }}><Icon name='search' size={32} color="#fff" /></TouchableOpacity>
        </View>
      </View>
      {
        notFound ?
          <View style={{
            width: "100%",
            marginTop: 66,
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}>
            <Icon name="search" size={48} color="#ff8800" />
            <Text style={{
              fontSize: 32,
              color: "#444",
              fontFamily: "Jost-SemiBold"
            }}>No Record</Text>
            <Text style={{
              fontSize: 32,
              color: "#444",
              fontFamily: "Jost-SemiBold"
            }}>Found For:</Text>
            <Text style={{
              fontSize: 32,
              color: "#ff8800",
              fontFamily: "Jost-SemiBold",
              width: "100%",
              textAlign: "center"
            }}>{cityName}</Text>
          </View>
          :
          !weather ?
            <View style={{
              width: "100%",
              marginTop: 66,
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}>
              <Icon name="search" size={48} color="#ff8800" />
              <Text style={{
                fontSize: 32,
                color: "#444",
                fontFamily: "Jost-SemiBold"
              }}>Search</Text>
              <Text style={{
                fontSize: 32,
                color: "#ff8800",
                fontFamily: "Jost-SemiBold"
              }}>Weather</Text>
            </View>
            :
            <View style={{
              flex: 1,
              width: "100%",
              gap: 4,
              alignItems: "center",
              paddingTop: 16,
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              backgroundColor: "#fefefe",
              elevation: 32
            }} >
              <Text numberOfLines={1} style={{
                fontSize: 28,
                color: "#444",
                fontFamily: "Jost-SemiBold",
                textAlign: "center"
              }}>{weather?.name}</Text>
              <Text numberOfLines={1} style={{
                fontSize: 40,
                color: "#ff8800",
                fontFamily: "Jost-SemiBold",
                textAlign: "center"
              }}>{weather?.main?.temp} °C</Text>
              <View style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 12
              }} >
                <Text numberOfLines={1} style={{
                  fontSize: 24,
                  color: "#555",
                  fontFamily: "Jost-SemiBold",
                }}>{weather?.sys?.country},</Text>
                <Text numberOfLines={1} style={{
                  fontSize: 24,
                  color: "#555",
                  fontFamily: "Jost-SemiBold",
                  textTransform: "capitalize"
                }}>{weather?.weather ? weather?.weather[0]?.description : null}</Text>
              </View>
              <ScrollView horizontal
                style={{
                  marginTop: 12,
                  width: "100%",
                }}
                contentContainerStyle={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <Card title="Humidity" content={`${weather?.main?.humidity} °C`} icon="water-outline" />
                <Card title="Wind" content={`${(((weather?.wind?.speed) * 2.9).toFixed())} km/h`} icon="weather-windy" />
                <Card title="Pressure" content={`${weather?.main?.pressure.toLocaleString()} P`} icon="weather-windy-variant" />
                <Card title="Min Temp" content={`${weather?.main?.temp_min} °C`} icon="thermometer-chevron-down" />
                <Card title="Max Temp" content={`${weather?.main?.temp_max} °C`} icon="thermometer-chevron-up" />
              </ScrollView>
            </View>
      }
    </ScrollView >
  );
}