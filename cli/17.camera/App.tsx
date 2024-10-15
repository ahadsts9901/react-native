import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform, Image } from 'react-native'
import { useCameraPermission, Camera, useCameraDevice, useCodeScanner } from "react-native-vision-camera"
import React, { useEffect, useRef, useState } from 'react'
import RNSystemSounds from '@dashdoc/react-native-system-sounds';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import IIcon from "react-native-vector-icons/Ionicons"
import MIcon from "react-native-vector-icons/MaterialCommunityIcons"

export default function App() {

  const [camera_type, set_camera_type] = useState<"back" | "front">("front")
  const [selected_feature, set_selected_feature] = useState<number>(0)
  const [flashlight, set_flashlight] = useState<'on' | 'off'>('on')
  const [captured_image, set_captured_image] = useState("")
  const [is_recording, set_is_recording] = useState(false)
  const [scan, set_scan] = useState(false)
  const [code, set_code] = useState<any>(null)

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
    } else if (selected_feature == 1) {
      if (is_recording) {
        endRecordVideo()
        set_is_recording(false)
      } else {
        startRecordVideo()
        set_is_recording(true)
      }
    }
  }

  // permissions
  async function hasAndroidPermission() {

    const getCheckPermissionPromise = async () => {
      if (+Platform.Version >= 33) {
        const [hasReadMediaImagesPermission, hasReadMediaVideoPermission] = await Promise.all([
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
        ]);
        return hasReadMediaImagesPermission && hasReadMediaVideoPermission;
      } else {
        return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }

    const getRequestPermissionPromise = async () => {
      if (+Platform.Version >= 33) {
        const statuses = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]);
        return statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
          PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        return status === PermissionsAndroid.RESULTS.GRANTED;
      }
    };

    return await getRequestPermissionPromise();
  }

  useEffect(() => {
    hasAndroidPermission()
  }, [])

  // save files in device
  async function save_asset(tag: string, type: 'video' | 'photo') {
    try {
      if (Platform.OS === "android" && !(await hasAndroidPermission())) {
        return;
      }
      await CameraRoll.saveAsset(tag, { type: type })
    } catch (error) {
      console.error(error)
    }
  };

  // picture functions
  const clickPhoto = async () => {
    const file = await cameraRef.current.takePhoto({
      flash: flashlight
    })
    set_captured_image(`file://${file.path}`)
    await save_asset(`file://${file.path}`, 'photo')
  }

  // video functions
  const startRecordVideo = () => {
    cameraRef.current.startRecording({
      flash: flashlight,
      onRecordingFinished: async (video: any) => {
        await save_asset(`file://${video.path}`, 'video')
      },
      onRecordingError: (error: any) => console.error(error)
    })
  }

  const endRecordVideo = async () => {
    await cameraRef.current.stopRecording()
  }

  // qr code
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (!scan) {
        set_code(codes[0].value)
        set_scan(true)
        RNSystemSounds.beep()
        setTimeout(() => {
          set_scan(false)
          set_code(null)
        }, 2000);
      }
    },
  })

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Camera
        style={{ flex: 1, width: "100%" }}
        device={device}
        isActive={true}
        ref={cameraRef}
        photo={true}
        video={true}
        audio={true}
        {...((selected_feature === 2 || selected_feature === 3) ? { codeScanner } : {})}
      />
      <>
        {
          captured_image && <Image source={{ uri: captured_image }} style={{ width: 100, height: 150, objectFit: "cover", borderWidth: 1, borderColor: "#fff", position: "absolute", top: 16, left: 16 }} />
        }
        {
          code && <Text
            style={{ width: "100%", height: "auto", color: "#fff", backgroundColor: "#00000055", padding: 8, position: "absolute", top: 0, left: 0 }}
          >{code}</Text>
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
            <IIcon name="camera" size={32} color={selected_feature == 0 ? "#eed332" : "#fff"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFeatureChange(1)}>
            <IIcon name="videocam" size={32} color={selected_feature == 1 ? "#eed202" : "#fff"} />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 56, height: 56, backgroundColor: is_recording ? "#ff000088" : "#00000088", borderRadius: 50, borderWidth: 3, borderColor: "#ffff" }}
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