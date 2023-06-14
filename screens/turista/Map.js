import { StyleSheet, Text, View, TextInput, Modal, Pressable } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import ModalComponent from '../../components/ModalComponent';
import { getTransportPositions, searchPlaceByCoordinates, searchPlaceByText } from '../../service';
import { useNavigation } from '@react-navigation/native';

const Map = ({ route }) => {
  // UBICACION
  const [location, setLocation] = useState(null);
  const [locationLoaded, setLocationLoaded] = useState(false);

  // DESTINO
  const [destination, setDestination] = useState(null);
  const [showDestinationMarker, setShowDestinationMarker] = useState(false);

  // LOGIN DATA
  const [userData, setUserData] = useState({
    id: 0,
    name: '',
    adultos: 0,
    ninos: 0,
  });

  const [locationLabel, setLocationLabel] = useState('');

  // const [transportPositions, setTransportPositions] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const [showTrackerPositions, setShowTrackerPositions] = useState(false);
  const [trackerCoordinates, setTrackerCoordinates] = useState({
    latitude: -16.399884822698212,
    longitude: -71.53550966370722,
  });

  const navigation = useNavigation();
  const mapRef = useRef(null);

  const { user, data } = route.params?.type;

  useEffect(() => {
    if (user === 'turista') {
      navigation.setOptions({ headerTitle: 'Hotel Los Balcones' });
      setUserData({
        id: data.id,
        name: data.name,
        adultos: data.adultos,
        ninos: data.ninos,
      });
    }
    if (user === 'conductor') {
      navigation.setOptions({ headerTitle: 'Hotel Los Balcones - Conductor' });
      navigation.navigate('RegistrarServicio', {
        id: 1,
      });
      setUserData({
        id: data.id,
        name: data.name,
        adultos: data.adultos,
        ninos: data.ninos,
      });
    }

    // solicitando permisos de GPS al entrar
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('permiso denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      setLocationLoaded(true);
    })();

    // setTransportPositions(getTransportPositions());
  }, []);

  const handleSearch = async () => {
    const map = mapRef.current;

    // buscar ubicacion del turista por coordenadas
    const { latitude, longitude } = location;
    const response = await searchPlaceByCoordinates({ latitude, longitude });
    setLocationLabel(response.location.split(',')[0]);

    // buscar ubicacion que ingreso el turista
    const coordinates = await searchPlaceByText(searchText);

    setDestination({
      latitude: coordinates[1],
      longitude: coordinates[0],
    });

    map.animateToRegion({
      latitude: coordinates[1],
      longitude: coordinates[0],
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    setShowDestinationMarker(true);
    setIsVisible(true);
  };

  const spawnMarker = () => {
    return (
      <Marker
        coordinate={destination}
        title="Este es tu destino"
        description="Esta es tu ubicacion de destino"
        onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
      />
    );
  };

  const toggleTrackerPositions = () => {
    if (!showTrackerPositions) {
      setShowTrackerPositions(true);
    } else {
      setShowTrackerPositions(false);
    }
    setTrackerCoordinates((prevState) => ({
      latitude: prevState.latitude + 0.0001,
      longitude: prevState.longitude + 0.00004,
    }));
  };

  const getTrackerPositions = () => {
    return <Marker coordinate={trackerCoordinates} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <ModalComponent setIsVisible={setIsVisible} isVisible={isVisible} ubicacion={locationLabel} destino={searchText} userData={userData} />
      {user === 'turista' && (
        <View style={styles.container}>
          <Text style={styles.text} onPress={() => setInterval(toggleTrackerPositions, 500)}>
            Hello {userData.name}!
          </Text>
          <Text style={styles.text} onPress={() => setIsVisible(true)}>
            Where do you want to go?
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput style={styles.input} placeholder="Seach the location" onChangeText={(text) => setSearchText(text)} />
            <Text style={{ color: 'white', backgroundColor: '#ffac1c', padding: 7, borderRadius: 10, height: '60%' }} onPress={() => handleSearch()}>
              Buscar
            </Text>
          </View>
        </View>
      )}
      {locationLoaded && (
        <MapView
          ref={mapRef}
          style={{ flex: user === 'turista' ? 0.7 : 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Tu estas aqui"
            description="Tu Ubicacion actual"
          />
          {showDestinationMarker && spawnMarker()}
          {showTrackerPositions && getTrackerPositions()}
          {/* {transportPositions.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.Position[0],
                longitude: marker.Position[1],
              }}
              title="Your distination"
              description="This is your destination location"
            />
          ))} */}
          {/* {console.log(transportPositions[0].Position[0], transportPositions[0].Position[1])} */}

          {/* <Polyline coordinates={[{ latitude: location.latitude, longitude: location.longitude }, destination]} strokeColor="#000" strokeWidth={2} /> */}
        </MapView>
      )}
      {!locationLoaded && <Text>Activa tu ubicacion</Text>}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    backgroundColor: '#28241c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    color: 'white',
    backgroundColor: '#ffac1c',
  },
  input: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    width: '60%',
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
