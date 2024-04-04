import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function App() {

  const [length, setLength]: any = useState(0)
  const [upperCase, setUpperCase]: any = useState(false)
  const [lowerCase, setLowerCase]: any = useState(false)
  const [numbers, setNumbers]: any = useState(false)
  const [chars, setChars]: any = useState(false)
  const [strength, setStrength]: any = useState("Weak")
  const [password, setPassword]:any = useState("pA$5w0rD gEner@t0r")

  useEffect(() => {
    if (length < 0 || length > 20) {
      setStrength("Invalid!")
    } else if (length >= 16) {
      setStrength("Strong!")
    } else if (length >= 12) {
      setStrength("Medium!")
    } else if (length >= 8) {
      setStrength("Weak!")
    } else if (length > 0) {
      setStrength("Too Weak!")
    }
  }, [length])

  const changeLength = (value: any) => {
    setLength(value)
  }

  const generatePassword = () =>{

    if(!length || length == 0 || length<0 || length > 20){
      setPassword("Invalid Length")
      setTimeout(()=>{
        setPassword("pA$5w0rD gEner@t0r")
      },2000)
      return
    }

    if (!upperCase && !lowerCase && !numbers && !chars) {
      setPassword("Select Password Type")
      setTimeout(()=>{
        setPassword("pA$5w0rD gEner@t0r")
      },2000)
      return
      return;
    }

    const _upperCase = "QWERTYUIOPASDFGHJKLZXCVBNM"
    const _lowerCase = "qwertyuiopasdfghjklzxcvbnm"
    const _numbers = "0123456789"
    const _chars = "!@#$%&*(){}"
    let charset = ""

    if(upperCase){
      charset += _upperCase
    }
    if(lowerCase){
      charset += _lowerCase
    }
    if(numbers){
      charset += _numbers
    }
    if(chars){
      charset += _chars
    }

    const charsetLength = charset.length;

        let password = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charsetLength);
            password += charset[randomIndex];
        }

      setPassword(password)

  }

  return (
    <ScrollView style={{
      flex: 1,
    }}>
      <SafeAreaView style={{
        flex: 1,
        padding: 12,
        backgroundColor: "#18171f"
      }}>
        {/* title */}
        <View style={{
          width: "100%",
          alignItems: "center",
        }}>
          <Text
            style={{
              color: "#a4ffaf",
              fontWeight: "bold",
              marginVertical: 16,
              fontSize: 22,
              fontFamily: "monospace"
            }}>Password Generator</Text>
        </View>
        {/* body */}
        <View style={{
          width: "100%",
          padding: 12,
          alignItems: "center",
        }}>
          {/* top box */}
          <View style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 18,
            backgroundColor: "#24232C",
          }}>
            <Text
              selectable
              style={{
                color: password === "Invalid Length" || password === "Select Password Type" ? "#f64a4a" : password === "pA$5w0rD gEner@t0r" ? "#9ca3af" : "#e6e5ea",
                fontSize: 18,
                fontFamily: "monospace",
                fontWeight: "bold",
                flex: 1,
                textAlign: "center"
              }}
            >{password}</Text>
          </View>
          {/* middle box */}
          <View style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            padding: 18,
            backgroundColor: "#24232C",
            marginVertical: 30
          }}>
            {/* characters */}
            <View style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <TextInput
                style={{
                  color: "#18171f",
                  fontSize: 18,
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  backgroundColor: "#e6e5ea",
                  width: "100%",
                  paddingHorizontal: 12
                }}
                onChangeText={changeLength}
                value={length}
                placeholder="Password Length (0-20)"
                keyboardType="numeric"
              />
            </View>
            {/* checkboxes */}
            {/* uppercase */}
            <View style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 36,
              gap: 6
            }}>
              <Switch
                onValueChange={(newValue) => setUpperCase(newValue)}
                value={upperCase}
                trackColor={{ false: "#767577", true: "#767577" }}
                thumbColor={upperCase ? "#a4ffaf" : "#f4f3f4"}
                style={{
                  marginLeft: -4
                }}
              />
              <TouchableOpacity onPress={() => setUpperCase(!upperCase)}
              ><Text numberOfLines={1} style={{
                color: "#e6e5ea",
                fontSize: 15,
                fontFamily: "monospace",
                fontWeight: "bold",
              }}>Include Uppercase Letters</Text></TouchableOpacity>
            </View>
            {/* lowercase */}
            <View style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 24,
              gap: 6
            }}>
              <Switch
                onValueChange={(newValue) => setLowerCase(newValue)}
                value={lowerCase}
                trackColor={{ false: "#767577", true: "#767577" }}
                thumbColor={lowerCase ? "#a4ffaf" : "#f4f3f4"}
                style={{
                  marginLeft: -4
                }}
              />
              <TouchableOpacity onPress={() => setLowerCase(!lowerCase)}
              ><Text numberOfLines={1} style={{
                color: "#e6e5ea",
                fontSize: 15,
                fontFamily: "monospace",
                fontWeight: "bold",
              }}>Include Lowercase Letters</Text></TouchableOpacity>
            </View>
            {/* numbers */}
            <View style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 24,
              gap: 6
            }}>
              <Switch
                onValueChange={(newValue) => setNumbers(newValue)}
                value={numbers}
                trackColor={{ false: "#767577", true: "#767577" }}
                thumbColor={numbers ? "#a4ffaf" : "#f4f3f4"}
                style={{
                  marginLeft: -4
                }}
              />
              <TouchableOpacity onPress={() => setNumbers(!numbers)}
              ><Text numberOfLines={1} style={{
                color: "#e6e5ea",
                fontSize: 15,
                fontFamily: "monospace",
                fontWeight: "bold",
              }}>Include Numbers</Text></TouchableOpacity>
            </View>
            {/* special characters */}
            <View style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 24,
              gap: 6
            }}>
              <Switch
                onValueChange={(newValue) => setChars(newValue)}
                value={chars}
                trackColor={{ false: "#767577", true: "#767577" }}
                thumbColor={chars ? "#a4ffaf" : "#f4f3f4"}
                style={{
                  marginLeft: -4
                }}
              />
              <TouchableOpacity onPress={() => setChars(!chars)}
              ><Text numberOfLines={1} style={{
                color: "#e6e5ea",
                fontSize: 15,
                fontFamily: "monospace",
                fontWeight: "bold",
              }}>Include Special Characters</Text></TouchableOpacity>
            </View>
            {/* strength */}
            <View style={{
              marginTop: 31,
              width: "98%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent:"space-between",
            }}>
              <Text style={{
                fontFamily: "monospace",
                color: strength === "Invalid!" ? "#f64a4a" : "#e6e5ea",
                fontWeight: "bold",
                fontSize: 16
              }}>{strength}</Text>
              <View style={{
                flexDirection:"row",
                height:"100%",
                alignItems:"center",
                gap:6
              }} >
              <View style={{
                borderWidth: 2,
                borderColor: "#e6e5ea",
                width: 10,
                height: "90%",
                backgroundColor: strength === "Strong!" ? "#a4ffaf" : strength === "Medium!" ? "#f8cd65" : strength === "Weak!" ? "#fb7c58" : "#f64a4a"
              }}></View>
              <View style={{
                borderWidth: 2,
                borderColor: "#e6e5ea",
                width: 10,
                height: "90%",
                backgroundColor: strength === "Strong!" ? "#a4ffaf" : strength === "Medium!" ? "#f8cd65" : strength === "Weak!" ? "#fb7c58" : "#24232c"
              }}></View>
              <View style={{
                borderWidth: 2,
                borderColor: "#e6e5ea",
                width: 10,
                height: "90%",
                backgroundColor: strength === "Strong!" ? "#a4ffaf" : strength === "Medium!" ? "#f8cd65" : "#24232c"
              }}></View>
              <View style={{
                borderWidth: 2,
                borderColor: "#e6e5ea",
                width: 10,
                height: "90%",
                backgroundColor: strength === "Strong!" ? "#a4ffaf" : "#24232c"
              }}></View>
              </View>
            </View>
          </View>
          {/* button */}
          <TouchableOpacity onPress={generatePassword}
            style={{
              width:"100%",
              padding:16,
              justifyContent:"center",
              alignItems:"center",
              backgroundColor:"#a4ffaf"
            }}
            ><Text style={{color: "#18171f", fontFamily:"monospace", fontSize:22, fontWeight:"bold"}}>Generate</Text></TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})