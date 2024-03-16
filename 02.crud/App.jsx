import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {

  const [fontsLoaded] = useFonts({
    SpaceMonoRegular: require("./assets/fonts/SpaceMono-Regular.ttf"),
    SpaceMonoBold: require("./assets/fonts/SpaceMono-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null
  }

  const [inputValue, setInputValue] = useState("")
  const [todos, setTodos] = useState([{ text: "koko" }, { text: "koko" }, { text: "koko" }])

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const submit = () => {

    if (!inputValue || inputValue.trim() === "") return

    const newTodo = {
      text: inputValue,
      id: todos.length + 1
    }

    setTodos([newTodo, ...todos])
    setInputValue("")

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <MaterialCommunityIcons name="star-three-points" size={32} color="#45a29e" />
        <Text style={styles.h1}>React Native Todo</Text>
      </View>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder='Enter Todo...'
          minLength={1}
          maxLength={24}
          value={inputValue}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>Add +</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.todos}
        showsVerticalScrollIndicator={false}
      >
        {
          todos.map((todo, i) => (
            <View key={i} style={styles._todo}><Text style={styles.todoText}>{todo.text}</Text></View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    gap: 32,
    padding: 16,
    paddingTop: 48,
    backgroundColor: "#0b0c10",
  },
  h1: {
    fontSize: 24,
    color: "#fefefe",
    fontFamily: "SpaceMonoBold",
  },
  head: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  form: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    gap: 24
  },
  input: {
    backgroundColor: "#fefefe",
    padding: 12,
    color: "#0b0c10",
    flex: 1,
    borderRadius: 8,
    fontSize: 18,
    fontFamily: "SpaceMonoBold",
  },
  button: {
    color: "#fefefe",
    backgroundColor: "#45a29e",
    borderRadius: 8,
    padding: 14
  },
  buttonText: {
    color: "#0b0c10",
    fontFamily: "SpaceMonoBold",
    fontSize: 18
  },
  todos: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 16,
  },
  todoText: {
    fontFamily: "SpaceMonoRegular",
    color: "#fefefe",
    width: "100%",
    display: "flex"
  },
  _todo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12
  }
});