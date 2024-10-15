import { SafeAreaView, Text, TouchableOpacity, View, Platform, NativeModules, useColorScheme, NativeEventEmitter, PermissionsAndroid, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Torch from 'react-native-torch';
import RNShake from "react-native-shake"
import BleManager from 'react-native-ble-manager';

const App = () => {

  const [_torch, set_torch] = useState(false)
  const [is_shaked, set_is_shaked] = useState("shake not detected")
  const [bluetooth, set_bluetooth] = useState("Bluetooth is OFF")

  const openCamera = async () => {
    const result = await launchCamera({ includeBase64: true })
  }

  const openGallery = async () => {
    const result = await launchImageLibrary({})
  }

  const toggleTorch = () => {
    Torch.switchState(_torch)
    set_torch(!_torch)
  }

  // shake
  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      set_is_shaked("shake detected for 5 seconds")
      setTimeout(() => {
        set_is_shaked("shake not detected")
      }, 5000)
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // bluetooth
  useEffect(() => {
    BleManager.enableBluetooth().then(() => {
      set_bluetooth("Bluetooth is ON")
    }).catch(() => {
      set_bluetooth("Bluetooth is OFF")
    })

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(result => {
            if (result) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }

  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "maroon", padding: 24, gap: 24 }}>
      <TouchableOpacity onPress={openCamera} style={{ padding: 16, paddingHorizontal: 32, backgroundColor: "#fff", borderRadius: 100 }}><Text style={{ color: "maroon", fontSize: 24, width: "100%", textAlign: "center" }}>Open Camera</Text></TouchableOpacity>
      <TouchableOpacity onPress={openGallery} style={{ padding: 16, paddingHorizontal: 32, backgroundColor: "#fff", borderRadius: 100 }}><Text style={{ color: "maroon", fontSize: 24, width: "100%", textAlign: "center" }}>Open Gallery</Text></TouchableOpacity>
      <TouchableOpacity onPress={toggleTorch} style={{ padding: 16, paddingHorizontal: 32, backgroundColor: "#fff", borderRadius: 100 }}><Text style={{ color: "maroon", fontSize: 24, width: "100%", textAlign: "center" }}>Torch is {!_torch ? "ON" : "OFF"}</Text></TouchableOpacity>
      <Text style={{ color: "#fff", fontSize: 24, width: "100%", textAlign: "center" }}>{is_shaked}</Text>
      <Text style={{ color: "#fff", fontSize: 24, width: "100%", textAlign: "center" }}>{bluetooth}</Text>
    </SafeAreaView>
  )
}

export default App