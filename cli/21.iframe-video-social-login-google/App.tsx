import React, { useEffect, useState, useRef } from 'react'
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Video, { VideoRef } from 'react-native-video';
import { WebView } from 'react-native-webview';

const App = () => {

  const videoRef = useRef<VideoRef>(null);
  const background = require('./osman-video.mp4');

  const [user, set_user] = useState<any>({})
  console.log("user", user)

  GoogleSignin.configure({
    webClientId: '374723832608-enrn1hcej2kconhefnndpor01k0ctb06.apps.googleusercontent.com',
  });

  const google_login = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken }: any = await GoogleSignin.signIn();
      console.log("idToken", idToken)
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      console.error(error.message)
    }
  }

  const onAuthStateChanged = async (user: any) => set_user(user)

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 18, gap: 18, backgroundColor: "white" }}>
      <TouchableOpacity activeOpacity={0.5} style={{ width: "100%", backgroundColor: "black", borderRadius: 6, padding: 12 }}
        onPress={() => google_login().then(() => Alert.alert('Signed in with Google!')).catch((e) => console.error(e))}
      >
        <Text style={{ width: "100%", color: "white", textAlign: "center", fontSize: 18 }}>Google Login</Text>
      </TouchableOpacity>
      <Video
        source={background}
        ref={videoRef}
        onError={(e: any) => console.error("error", e)}
        style={{ width: "100%", height: "30%", backgroundColor: "black" }}
        controls
      />
      <View style={{
        width: "100%", flex: 1,
      }}>
        <WebView
          source={{ uri: 'https://ahadsts9901.github.io/sma-games/' }}
          style={{
            flex: 1
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default App
