import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.innerView}>
        <Image source={require("./assets/ahad-sts.jpg")}
          style={styles.image}
        />
        <Image source={require("./assets/abdul-ahad.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.heading}>Hello world</Text>
      <Text style={styles.heading2}>My first react native app</Text>
      <Text style={styles.heading2}>10 + 90 = {10 + 90}</Text>
      <Text>React Native Is Amazing &copy;</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
  },
  heading2: {
    fontSize: 24,
    textTransform: "capitalize"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  innerView: {
    width: '100%',
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  }
});
