import { StyleSheet, Button, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { searchFaceByImage, uploadImageToCollection } from '../../service';
import { AppContext } from '../../AppContext';

const CameraRoll = ({ route }) => {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions(true);
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const photo = route.params?.photo ?? {
    id: 0,
    uri: '',
  };
  const { user, setUser } = useContext(AppContext);

  const verifyFaceFound = async () => {
    console.log(data);
  };

  const renderPhotos = () => {
    return (
      <View key={photo.id}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: photo.uri,
          }}
        />
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => moveImage(photo)}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#ffac1c',
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
              Guardar rostro en aws
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => searchFace(photo)}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#ffac1c',
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
              Buscar rostro
            </Text>
          </TouchableOpacity>
        </View>
        {/* {data['$metadata']?.httpStatusCode === 200 ? (
          <Text>{data.SearchedFaceConfidence}</Text>
        ) : data['$metadata']?.httpStatusCode === 400 ? (
          <Text>Error 400: Solicitud incorrecta</Text>
        ) : null} */}

        {/* {data.faceFound && <Text>Face found! you can access!!</Text>}
        {!data.faceFound && <Text>Face not found</Text>} */}

        {/* {data['$metadata']?.httpStatusCode === 200 && <Text>{data.SearchedFaceConfidence}</Text>} */}
      </View>
    );
  };

  const moveImage = async (photo) => {
    // codigo para guardar la imagen en la galeria
    // await requestPermission();
    // MediaLibrary.saveToLibraryAsync(uri);
    try {
      const formData = new FormData();
      formData.append('face', {
        uri: photo.uri,
        name: photo.uri,
        type: 'image/jpg',
      });

      const response = await uploadImageToCollection(formData);

      if (response.ok) {
        console.log('¡Imagen enviada exitosamente!');
      } else {
        console.log('Error al enviar la imagen');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const searchFace = async (photo) => {
    try {
      const formData = new FormData();
      formData.append('face', {
        uri: photo.uri,
        name: 'image.jpg',
        type: 'image/jpg',
      });

      const response = await searchFaceByImage(formData);

      const data = await response.json();
      setData(data);

      if (user.userType === 'turista') {
        if (data.faceFound) {
          alert('Conductor verificado!! :)');
        } else {
          alert('Conductor no verificado :(');
        }
      }
      if (user.userType === 'conductor') {
        if (data.faceFound) {
          alert('Turista verificado!! :)');
        } else {
          alert('Turista no verificado :(');
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return <View style={styles.container}>{renderPhotos()}</View>;
};

export default CameraRoll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 300,
    height: 300,
  },
});
