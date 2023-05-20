import { StyleSheet, Text, View, TextInput, Modal, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const Map = ({ route }) => {
  const [location, setLocation] = useState(null);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [contador, setContador] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { type } = route.params;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // Handle permission denied
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      setLocationLoaded(true);
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Añadir un nuevo objeto al arreglo
      setMarkers((prevObjetos) => [
        ...prevObjetos,
        {
          latitude: -16.39730485879827,
          longitude: -71.53299274773156 + contador + 1,
        },
      ]);
      setContador((prevContador) => prevContador + 0.0003);
    }, 3000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [contador]);

  return (
    <View style={{ flex: 1 }}>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.text}>Ubicacion: </Text>
            <Text style={styles.text}>Destino: </Text>
            <View flexDirection="row">
              <Text style={styles.button} backgroundColor="#ffac1c">
                Adquirir servicio
              </Text>
              <Text style={styles.button} backgroundColor="#88a4fc" onPress={() => setIsVisible(false)}>
                Reservar servicio
              </Text>
            </View>
          </View>
          <Text style={styles.title}>Datos del conductor</Text>
          <Text style={styles.text}>Conductor: </Text>
          <Text style={styles.text}>Color: </Text>
          <Text style={styles.text}>Placa: </Text>
          <Text style={styles.text}>Modelo: </Text>
        </View>
      </Modal>
      <View style={styles.container}>
        <Text style={styles.text}>Jack Lemonade {type}</Text>
        <Text style={styles.text} onPress={() => setIsVisible(true)}>
          Where do you want to go?
        </Text>
        <TextInput style={styles.input} placeholder="Seach the location" onChangeText={(text) => onChange('location', text)} />
      </View>
      {locationLoaded && (
        <MapView
          style={{ flex: 0.6 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You are here"
            description="This is your current location"
          />
          {/* {markers.map((marker) => (
            <Marker
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title="You are here"
              description="This is your current location"
            />
          ))} */}
        </MapView>
      )}
      {!locationLoaded && <Text>Turn on your location</Text>}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    backgroundColor: '#28241c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    color: 'white',
    marginHorizontal: 5,
  },
  input: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    width: '90%',
  },
  text: {
    color: 'white',
  },
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '40%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});
