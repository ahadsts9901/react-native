import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform, Image } from 'react-native'
import { useCameraPermission, Camera, useCameraDevice } from "react-native-vision-camera"
import React, { useEffect, useRef, useState } from 'react'
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import IIcon from "react-native-vector-icons/Ionicons"
import MIcon from "react-native-vector-icons/MaterialCommunityIcons"

export default function App() {

  const [camera_type, set_camera_type] = useState<"back" | "front">("front")
  const [selected_feature, set_selected_feature] = useState<number>(0)
  const [flashlight, set_flashlight] = useState<'on' | 'off'>('on')
  const [captured_image, set_captured_image] = useState("")

  const { hasPermission, requestPermission } = useCameraPermission()
  const device: any = useCameraDevice(camera_type)

  const cameraRef: any = useRef()

  useEffect(() => {
    if (!hasPermission) requestPermission()
  }, [])

  const handleSwapCamera = () => {
    camera_type === "back" ? set_camera_type("front") : set_camera_type("back")
  }

  const handleSwapTorch = () => {
    flashlight === 'on' ? set_flashlight('off') : set_flashlight('on')
  }

  const handleFeatureChange = (index: number) => {
    set_selected_feature(index)
  }

  const handleButtonPress = () => {
    if (selected_feature == 0) {
      clickPhoto()
    }
  }

  const clickPhoto = async () => {
    const file = await cameraRef.current.takePhoto({
      flash: flashlight
    })
    set_captured_image(`file://${file.path}`)
    await savePicture(`file://${file.path}`)
  }

  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (+Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (+Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          (statuses) =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  useEffect(()=>{
    hasAndroidPermission()
  },[])

  async function savePicture(tag: string) {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.saveAsset(tag, { type: 'photo' })
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Camera
        style={{ flex: 1, width: "100%" }}
        device={device}
        isActive={true}
        ref={cameraRef}
        photo={true}
      />
      <>
        {
          captured_image && <Image source={{ uri: captured_image }} style={{ width: 100, height: 150, objectFit: "cover", borderWidth: 1, borderColor: "#fff", position: "absolute", top: 16, left: 16 }} />
        }
        <View style={{ position: "absolute", top: 24, right: 24, display: "flex", alignItems: "center", gap: 24 }}>
          <TouchableOpacity onPress={handleSwapCamera}>
            <IIcon name="camera-reverse" color="#fff" size={32} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSwapTorch}>
            <MIcon name={flashlight === 'on' ? "flashlight" : "flashlight-off"} color="#fff" size={32} />
          </TouchableOpacity>
        </View>
      </>
      <>
        <View style={{ position: "absolute", bottom: 8, padding: 8, width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
          <TouchableOpacity onPress={() => handleFeatureChange(0)}>
            <IIcon name="camera" size={32} color={selected_feature == 0 ? "#eed202" : "#fff"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFeatureChange(1)}>
            <IIcon name="videocam" size={32} color={selected_feature == 1 ? "#eed202" : "#fff"} />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 56, height: 56, backgroundColor: "#00000088", borderRadius: 50, borderWidth: 3, borderColor: "#ffff" }}
            onPress={handleButtonPress}
          >
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFeatureChange(2)}>
            <IIcon name="qr-code" size={32} color={selected_feature == 2 ? "#eed202" : "#fff"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFeatureChange(3)}>
            <MIcon name="barcode" size={32} color={selected_feature == 3 ? "#eed202" : "#fff"} />
          </TouchableOpacity>
        </View>
      </>
    </View>
  )
}

const styles = StyleSheet.create({})