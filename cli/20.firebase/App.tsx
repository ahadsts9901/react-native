import React, { useEffect, useState } from 'react'
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';

const App = () => {

  const [user, set_user] = useState<any>(null)
  const [_docs, set_docs] = useState<any>([])
  const [is_loading, set_is_loading] = useState(false)

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user: any) => set_user(user))
  }, []);

  // authentication
  const emailsignup = () => {
    auth()
      .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
      .then(() => {
        Alert.alert('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }

        Alert.alert("error");
        console.error("error", error);
      });

  }

  const emailLogin = () => {
    auth()
      .signInWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
      .then(() => {
        Alert.alert('User account signed in!');
      })
      .catch(error => {

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }

        Alert.alert("error");
        console.error("error", error);
      });
  }

  const logout = () => {
    auth()
      .signOut()
      .then(() => Alert.alert('User signed out!'));
  }

  // crud
  const addDoc = () => {
    const usersCollection = firestore().collection('Main');
    const userDocument = firestore().collection('Main').add({
      title: "new title",
      text: "new text"
    }).then(() => {
      Alert.alert("Data added")
      getDocs()
    }).catch((e) => {
      Alert.alert("error")
      console.error(e)
    })
  }

  useEffect(() => {
    getDocs()
  })

  const getDocs = async () => {
    const docs = await firestore().collection('Main').get()
    // const user = await firestore().collection('Users').doc('docId').get();
    set_docs(docs.docs)
  }

  const deleteDoc = (id: any) => {
    if (!id || id.trim() == "") return
    firestore()
      .collection('Main')
      .doc(id)
      .delete()
      .then(() => {
        getDocs()
        Alert.alert('document deleted!')
      });
  }

  const editDoc = (id: any) => {
    if (!id || id.trim() == "") return
    firestore()
      .collection('Main')
      .doc(id)
      .update({
        title: "updated title",
        text: "updated text"
      })
      .then(() => {
        getDocs()
        Alert.alert('document updated!')
      });
  }

  // file upload
  const uploadFile = async (filePath: any) => {
    try {
      set_is_loading(true)
      const reference = storage().ref(`images123/${new Date().getTime()}.jpg`);
      await reference.putFile(filePath);
      const url = await reference.getDownloadURL();
      set_is_loading(false)
      console.log('File available at:', url);
      Alert.alert('Upload Successful', `File available at: ${url}`);
    } catch (error: any) {
      set_is_loading(false)
      Alert.alert("error", error.message)
      console.error('Upload failed:', error);
    }
  };

  const chooseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && response.assets) {
        const pathToFile = response.assets[0].uri;
        uploadFile(pathToFile);
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 18, gap: 18 }}>
      <Text style={{ color: "black", fontSize: 18, textAlign: "center", width: "100%" }}>Email: {user?.email ? user?.email : ""}</Text>
      <TouchableOpacity onPress={emailsignup} activeOpacity={0.8} style={{ width: "100%", padding: 12, paddingHorizontal: 18, backgroundColor: "black", borderRadius: 4 }}>
        <Text style={{ color: "white", fontSize: 18, textAlign: "center", width: "100%" }}>Signup with email</Text>
      </TouchableOpacity>
      {
        user ?
          <TouchableOpacity onPress={logout} activeOpacity={0.8} style={{ width: "100%", padding: 12, paddingHorizontal: 18, backgroundColor: "black", borderRadius: 4 }}>
            <Text style={{ color: "white", fontSize: 18, textAlign: "center", width: "100%" }}>Logout</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={emailLogin} activeOpacity={0.8} style={{ width: "100%", padding: 12, paddingHorizontal: 18, backgroundColor: "black", borderRadius: 4 }}>
            <Text style={{ color: "white", fontSize: 18, textAlign: "center", width: "100%" }}>Login with email</Text>
          </TouchableOpacity>
      }
      <TouchableOpacity onPress={addDoc} activeOpacity={0.8} style={{ width: "100%", padding: 12, paddingHorizontal: 18, backgroundColor: "black", borderRadius: 4 }}>
        <Text style={{ color: "white", fontSize: 18, textAlign: "center", width: "100%" }}>Add Doc</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={chooseImage} activeOpacity={0.8} style={{ width: "100%", padding: 12, paddingHorizontal: 18, backgroundColor: "black", borderRadius: 4 }}>
        <Text style={{ color: "white", fontSize: 18, textAlign: "center", width: "100%" }}>{is_loading ? "Uploading file..." : "Upload File"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getDocs} activeOpacity={0.8} style={{ width: "100%", padding: 12, paddingHorizontal: 18, backgroundColor: "black", borderRadius: 4 }}>
        <Text style={{ color: "white", fontSize: 18, textAlign: "center", width: "100%" }}>Get Docs</Text>
      </TouchableOpacity>
      <ScrollView style={{ flex: 1 }}>
        {
          _docs.map((doc: any, i: number) => (
            <View style={{ flexDirection: "row", gap: 4, padding: 4 }} key={i}>
              <Text style={{ fontSize: 18, width: "50%" }}>{doc._data.text}</Text>
              <TouchableOpacity onPress={() => deleteDoc(doc._ref._documentPath._parts[1])} style={{ padding: 2, paddingHorizontal: 12, borderRadius: 2, backgroundColor: "red" }}><Text style={{ color: "white" }}>delete</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => editDoc(doc._ref._documentPath._parts[1])} style={{ padding: 2, paddingHorizontal: 12, borderRadius: 2, backgroundColor: "green" }}><Text style={{ color: "white" }}>edit</Text></TouchableOpacity>
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default App