import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, PermissionsAndroid, ScrollView } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import Contacts from 'react-native-contacts';

const App = () => {
  const [isConnected, setConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState<number | string>(0);
  const [_contacts, set_contacts] = useState<any>([])

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {

    const fetchBatteryLevel = async () => {
      const level = await DeviceInfo.getBatteryLevel();
      setBatteryLevel(Math.round(level * 100).toFixed(0) + "%");
    };

    fetchBatteryLevel();

  }, []);

  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    title: 'Contacts',
    message: 'This app would like to view your contacts.',
    buttonPositive: 'Please accept bare mortal',
  })
    .then((res) => {
      Contacts.getAll()
        .then((contacts) => {
          set_contacts(contacts)
        })
        .catch((e) => {
          console.error(e);
        });
    })
    .catch((error) => {
      console.error('Permission error: ', error);
    });

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "flex-start", alignItems: "flex-start", gap: 24, padding: 24, backgroundColor: "#000" }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}><Text style={{ color: "#fff", fontSize: 18 }}>You are currently:</Text>{isConnected ? <Text style={{ color: "#fff", fontSize: 18 }}> Online</Text> : <Text style={{ color: "#fff", fontSize: 18 }}> Offline</Text>}</View>
      <Text style={{ color: "#fff", fontSize: 18 }}>Battery Level: {batteryLevel}</Text>
      <Text style={{ color: "#fff", fontSize: 28 }}>Contacts:</Text>
      <ScrollView style={{ height: 300, width: "100%" }}>
        {_contacts.map((contact: any, i: number) => (
          <Text key={i} style={{ color: "#fff", fontSize: 16, padding: 12 }}>{contact?.displayName} {contact?.phoneNumbers[0]?.number}</Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;