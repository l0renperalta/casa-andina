import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

const FacialRecognition = () => {
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      Alert.alert('Access denied');
    }
  };

  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const __savePhoto = () => {};

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };

  return (
    <View style={styles.container}>
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '50%',
          }}
        >
          {previewVisible && capturedImage ? (
            <CameraPreview
              photo={capturedImage}
              savePhoto={__savePhoto}
              retakePicture={__retakePicture}
            />
          ) : (
            <Camera
              style={{ flex: 1 }}
              ref={(r) => {
                camera = r;
              }}
              type={CameraType.front}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    left: '5%',
                    top: '10%',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                ></View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#fff',
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              marginBottom: 6,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
};

export default FacialRecognition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const photos = [];
let id = 0;

const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
  const navigation = useNavigation();

  photos.push({ id: ++id, ...photo });

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                }}
                onPress={() => navigation.navigate('Localization', { photos })}
              >
                save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
