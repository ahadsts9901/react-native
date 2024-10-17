import React from 'react'
import { SafeAreaView } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        style={{
          flex: 1,
          backgroundColor: "red"
        }}
      >
      </MapView>
    </SafeAreaView>
  )
}

export default App
