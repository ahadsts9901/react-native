import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons, Entypo, Feather } from '@expo/vector-icons';
import { MD3LightTheme as DefaultTheme, PaperProvider, Modal, Portal, Button } from 'react-native-paper';

export default function App() {

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#45a29e',
      secondary: '#45a29e',
    },
  };

  const [inputValue, setInputValue]: any = useState("")
  const [todos, setTodos]: any = useState([])
  const [showDelModal, setShowDelModal]: any = useState(false)
  const [showEditModal, setShowEditModal]: any = useState(false)
  const [ind, setInd]: any = useState()
  const [editInd, setEditInd]: any = useState()
  const [editedInputValue, setEditedInputValue]: any = useState()

  const handleInputChange = (text: any) => {
    setInputValue(text);
  };

  const submit = () => {

    if (!inputValue || inputValue.trim() === "") return

    setTodos([inputValue, ...todos])
    setInputValue("")

  }

  const del = (id: any) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(id, 1);
    setTodos(updatedTodos);
    setShowDelModal(false)
  }

  const handleEditInputChange = (text: any) => {
    setEditedInputValue(text)
  }

  const edit = (id: any, newText: any) => {

    if (!newText || newText.trim() === "") return

    const updatedTodos: any = [...todos];
    updatedTodos[id] = newText;
    setTodos(updatedTodos);
    setShowEditModal(false);
  }

  return (
    <>
      <PaperProvider theme={theme}>
        <>
          {
            showDelModal && <Portal>
              <View style={styles.portal}>
                <Modal visible={showDelModal} onDismiss={() => setShowDelModal(false)} contentContainerStyle={styles.modalStyle}>
                  <Text style={styles.modalText}>Are you sure to delete?</Text>
                  <View style={styles.modalButtons}>
                    <Button style={styles.modalButton} mode="outlined" onPress={() => setShowDelModal(false)}>
                      <Text style={styles.modalButtonsText}>No</Text>
                    </Button>
                    <Button style={styles.modalButton} mode="contained" onPress={() => del(ind)}>
                      <Text style={styles.modalButtonsText}>Yes</Text>
                    </Button>
                  </View>
                </Modal>
              </View>
            </Portal>
          }
        </>
        <>
          {
            showEditModal && <Portal>
              <View style={styles.portal}>
                <Modal visible={showEditModal} onDismiss={() => setShowEditModal(false)} contentContainerStyle={styles.modalStyle}>
                  <Text style={styles.modalText}>Edit Todo...</Text>
                  <TextInput
                    style={styles.editInput}
                    placeholder='Edit Todo...'
                    maxLength={18}
                    onChangeText={handleEditInputChange}
                    defaultValue={editedInputValue}
                  />
                  <View style={styles.modalButtons}>
                    <Button style={styles.modalButton} mode="outlined" onPress={() => setShowEditModal(false)}>
                      <Text style={styles.modalButtonsText}>Cancel</Text>
                    </Button>
                    <Button style={styles.modalButton} mode="contained" onPress={() => edit(editInd, editedInputValue)}>
                      <Text style={styles.modalButtonsText}>Edit</Text>
                    </Button>
                  </View>
                </Modal>
              </View>
            </Portal>
          }
        </>
        <>
          <SafeAreaView style={styles.container}>
            <View style={styles.head}>
              <MaterialCommunityIcons name="star-three-points" size={32} color="#45a29e" />
              <Text style={styles.h1}>React Native Todo</Text>
            </View>
            <View style={styles.form}>
              <TextInput style={styles.input} placeholder='Enter Todo...'
                maxLength={18}
                value={inputValue}
                onChangeText={handleInputChange}
              />
              <Button style={styles.button} icon="plus" mode="contained" onPress={submit}>
                <Text style={styles.buttonText}>Add</Text>
              </Button>
            </View>
            <ScrollView contentContainerStyle={styles.todos}
              showsVerticalScrollIndicator={false}
            >
              {
                todos.map((todo: any, i: number) => (
                  <View key={i} style={styles._todo}>
                    <Text style={styles.todoText}>{todo}</Text>
                    <TouchableOpacity
                      // style={styles.todoButton}
                      onPress={() => {
                        setShowEditModal(true)
                        setEditInd(i)
                        setEditedInputValue(todo)
                      }}
                    ><Feather name="edit-2" size={18} color="#fefefe" /></TouchableOpacity>
                    <TouchableOpacity
                      // style={styles.todoButton}
                      onPress={() => {
                        setShowDelModal(true)
                        setInd(i)
                      }}
                    ><Entypo name="cross" size={26} color="#fefefe" />
                    </TouchableOpacity>
                  </View>
                ))
              }
            </ScrollView>
          </SafeAreaView>
        </>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 32,
    padding: 16,
    paddingTop: 48,
    backgroundColor: "#0b0c10",
  },
  h1: {
    fontSize: 24,
    color: "#fefefe",
    fontFamily: "Space Mono",
    fontWeight: "400",
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
    paddingVertical: 12,
    paddingHorizontal: 24,
    color: "#0b0c10",
    flex: 1,
    borderRadius: 100,
    fontSize: 18,
    // fontFamily: "SpaceMonoBold",
  },
  button: {
    paddingVertical: 6,
    borderRadius: 100,
  },
  buttonText: {
    // fontFamily: "SpaceMonoBold",
    fontSize: 16,
  },
  todos: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 16,
  },
  todoText: {
    // fontFamily: "SpaceMonoRegular",
    color: "#fefefe",
    fontSize: 18,
    width: 200,
  },
  _todo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 8,
  },
  portal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalStyle: {
    height: 230,
    backgroundColor: "#fefefe",
    width: "80%",
    margin: "10%",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 24,
    paddingTop: 40,
    gap: 16
  },
  modalText: {
    fontSize: 18,
    // fontFamily: "SpaceMonoBold",
    flex: 1,
    textAlign: "center",
    lineHeight: 32,
  },
  modalButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16
  },
  modalButton: {
    height: 40,
    borderRadius: 100,
  },
  modalButtonsText: {
    // fontFamily: "SpaceMonoBold",
    fontSize: 14,
  },
  editInput: {
    backgroundColor: "#fefefe",
    padding: 24,
    color: "#0b0c10",
    fontSize: 18,
    // fontFamily: "SpaceMonoBold",
    width: "100%",
    marginBottom: 10,
  }
});