import { StyleSheet, Text, View, TextInput, Modal, Pressable } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import ModalComponent from '../../components/ModalComponent';
import { getTransportPositions, searchPlaceByText } from '../../service';

const Map = ({ route }) => {
  const { name, adultos, ninos } = route.params.type;
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [locationLoaded, setLocationLoaded] = useState(false);

  // const [transportPositions, setTransportPositions] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [destinationMarker, setDestinationMarker] = useState(false);

  // Set modal state visibility
  const [isVisible, setIsVisible] = useState(false);
  const [destination, setDestination] = useState({
    latitude: -16.401589443979947,
    longitude: -71.53376181416482,
  });

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

    // setTransportPositions(getTransportPositions());
  }, []);

  const handleSearch = async () => {
    const map = mapRef.current;
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
    setDestinationMarker(true);
    setIsVisible(true);
  };

  const spawnMarker = () => {
    return (
      <Marker
        coordinate={destination}
        title="Your distination"
        description="This is your destination location"
        onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ModalComponent setIsVisible={setIsVisible} isVisible={isVisible} adultos={adultos} ninos={ninos} />
      <View style={styles.container}>
        <Text style={styles.text}>Hello {name}!</Text>
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
      {locationLoaded && (
        <MapView
          ref={mapRef}
          style={{ flex: 0.7 }}
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
            title="You are here"
            description="This is your current location"
          />
          {destinationMarker && spawnMarker()}

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
      {!locationLoaded && <Text>Turn on your location</Text>}
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
