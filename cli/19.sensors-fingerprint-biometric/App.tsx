import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, Text } from 'react-native';
import { accelerometer, gyroscope, barometer, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import { map, filter } from "rxjs/operators";
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

function App() {
  const [speed, setSpeed] = useState<any>("");
  const [rotation, setRotation] = useState<any>("");
  const [pressure, setPressure] = useState<any>("");
  const [bioMetricSensor, setBioMetricSensor] = useState<any>("")

  // accelerometer
  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 100);
    const accelerometerSubscription = accelerometer
      .pipe(
        map(({ x, y, z }) => Math.sqrt(x * x + y * y + z * z)),
        filter(speed => speed > 9.65)
      )
      .subscribe(
        speed => setSpeed(speed.toFixed(2)),
        error => setSpeed("sensor not available")
      );

    return () => {
      accelerometerSubscription.unsubscribe();
    };
  }, []);

  // gyroscope
  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.gyroscope, 100);
    const gyroscopeSubscription = gyroscope
      .pipe(
        map(({ x, y, z }) => Math.sqrt(x * x + y * y + z * z)),
        filter(rotation => rotation > 1)
      )
      .subscribe(
        rotation => setRotation(rotation.toFixed(2)),
        error => setRotation("sensor not available")
      );

    return () => {
      gyroscopeSubscription.unsubscribe();
    };
  }, []);

  // barometer
  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.barometer, 100);
    const barometerSubscription = barometer
      .pipe(
        map(({ pressure }) => pressure),
        filter(pressure => pressure > 950)
      )
      .subscribe(
        pressure => setPressure(pressure.toFixed(2)),
        error => setPressure("sensor not available")
      );

    return () => {
      barometerSubscription.unsubscribe();
    };
  }, []);

  // biometric
  useEffect(() => {
    chechBioMetric()
  }, [])

  const chechBioMetric = async () => {

    const rnBiometrics = new ReactNativeBiometrics()
    rnBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject

        rnBiometrics.createKeys()
          .then((resultObject) => {
            const { publicKey } = resultObject
            console.log(publicKey)
          })

        if (available && biometryType === BiometryTypes.TouchID) {
          setBioMetricSensor('TouchID is supported')
        } else if (available && biometryType === BiometryTypes.FaceID) {
          setBioMetricSensor('FaceID is supported')
        } else if (available && biometryType === BiometryTypes.Biometrics) {

          setBioMetricSensor('Fingerprint is supported')

          rnBiometrics.createSignature({
            promptMessage: 'Verify',
            payload: "verify fingerprint",
          })
            .then((resultObject) => {
              const { success, signature, error } = resultObject;
              if (error) console.error(error)
              if (success) {
                console.log(signature);
                Alert.alert("Fingerprint is correct");
              } else {
                Alert.alert("Fingerprint is incorrect");
              }
            })

        } else {
          setBioMetricSensor('Biometrics not supported')
        }
      }).catch((error) => console.error(error))
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "grey", padding: 24 }}>
      <Text style={{ width: "100%", textAlign: "left", color: "black", fontSize: 22 }}>
        Device Moving Speed: {speed === "sensor not available" ? "Sensor not available" : speed > 9.65 ? speed : ""}
      </Text>
      <Text style={{ width: "100%", textAlign: "left", color: "black", fontSize: 22, marginTop: 10 }}>
        Device Rotation Speed: {rotation === "sensor not available" ? "Sensor not available" : rotation > 1 ? rotation : ""}
      </Text>
      <Text style={{ width: "100%", textAlign: "left", color: "black", fontSize: 22, marginTop: 10 }}>
        Atmospheric Pressure: {pressure === "sensor not available" ? "Sensor not available" : pressure > 950 ? pressure + " hPa" : ""}
      </Text>
      <Text style={{ width: "100%", textAlign: "left", color: "black", fontSize: 22, marginTop: 10 }}>
        {bioMetricSensor}
      </Text>
    </SafeAreaView>
  );
}

export default App;
