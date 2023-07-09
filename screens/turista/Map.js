import { StyleSheet, Text, View, TextInput, Alert, Image, Pressable } from 'react-native';
import { useState, useEffect, useRef, useContext } from 'react';
import * as Location from 'expo-location';
import ModalComponent from '../../components/ModalComponent';
import { getConductorData, getTransportPositions, searchPlaceByCoordinates, searchPlaceByText } from '../../service';
import { useNavigation } from '@react-navigation/native';
import MapComponent from '../../components/MapComponent';
import { Marker } from 'react-native-maps';
import { AppContext } from '../../AppContext';

const Map = ({ route }) => {
  const { user, data } = route.params?.type;
  const [userData, setUserData] = useState({
    id: 0,
    name: '',
    adultos: 0,
    ninos: 0,
  });
  const navigation = useNavigation();
  const mapRef = useRef(null);

  // UBICACION TURISTA: Coordenadas
  const [location, setLocation] = useState(null);
  const [locationLoaded, setLocationLoaded] = useState(false);

  // DESTINO TURISTA: Coordenadas
  const [destination, setDestination] = useState(null);
  const [destinationMarkerVisible, setDestinationMarkerVisible] = useState(false);

  // UBICACION TURISTA: Texto
  const [locationLabel, setLocationLabel] = useState('');

  // BUSCAR DESTINO
  const [searchText, setSearchText] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [driverMarkerIsVisible, setDriverMarkerIsVisible] = useState(false);

  // Global state
  const { serviceAccepted, setServiceAccepted } = useContext(AppContext);
  const { serviceData, setServiceData } = useContext(AppContext);

  useEffect(() => {
    navigation.addListener('focus', () => {
      if (serviceData.displayModal) {
        console.log(serviceData);
        setModalVisible(true);

        setServiceData({
          displayModal: false,
          ubicacion: '',
          destino: '',
          horaReserva: null,
          niños: 0,
          adultos: 0,
        });
      }
    });
    // Check if service is accepted
    if (serviceAccepted) {
      setDriverMarkerIsVisible(true);
      getConductorData().then((data) => {
        Alert.alert(
          //title
          'Servicio aceptado por: ' + data.conductor.nombres + ' ' + data.conductor.apellidos,
          //body
          'Vehiculo color: ' + data.vehiculo.color + ' - Placa: ' + data.vehiculo.placa,
          [
            {
              text: 'Aceptar',
            },
            {
              text: 'Cancelar',
              style: 'cancel',
            },
          ],
          { cancelable: true }
        );
      });
      callback();
    }
    getLocationOnLoad();

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
  }, [navigation]);

  const getLocationOnLoad = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('permiso denegado');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
    setLocationLoaded(true);
  };

  const handleSearch = async () => {
    const map = mapRef.current;

    // Obtener calle donde se encuentra el turista por coordenadas
    const { latitude, longitude } = location;
    const response = await searchPlaceByCoordinates({ latitude, longitude });
    setLocationLabel(response.location.split(',')[0]);

    // Buscar ubicacion que ingreso el turista
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

    setDestinationMarkerVisible(true);
    setModalVisible(true);
  };

  const destinationMarker = () => {
    return (
      <Marker
        coordinate={destination}
        title="Este es tu destino"
        description="Esta es tu ubicacion de destino"
        onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
      >
        <Image source={require('./ubicacion2.png')} style={{ height: 30, width: 30 }} />
      </Marker>
    );
  };

  const [driverCoordinates, setDriverCoordinates] = useState({
    latitude: -16.399884822698212,
    longitude: -71.53550966370722,
  });

  // const getDriverPosition = () => {
  //   let intervalRef;

  //   const startInterval = async () => {
  //     try {
  //       const data = await getTransportPositions();
  //       let updatedLatitude = data[data.length - 1].Position[1];
  //       let updatedLongitude = data[data.length - 1].Position[0];

  //       setDriverCoordinates(() => ({ latitude: updatedLatitude, longitude: updatedLongitude }));
  //     } catch (error) {
  //       alert('couldnt fetch driver position :(');
  //     }

  //     // intervalRef = setInterval(() => {
  //     //   setDriverCoordinates((prevState) => ({ ...prevState, latitude: prevState.latitude + 0.0001, longitude: prevState.longitude + 0.00004 }));
  //     // }, 1000);
  //   };

  //   const stopInterval = () => {
  //     clearInterval(intervalRef);
  //     console.log('Intervalo detenido');
  //   };

  //   Alert.alert(
  //     'Servicio',
  //     'ubicacion',
  //     [
  //       {
  //         text: 'Aceptar',
  //         onPress: () => startInterval(),
  //       },
  //       {
  //         text: 'Cancelar',
  //         onPress: () => stopInterval(),
  //         style: 'cancel',
  //       },
  //     ],
  //     { cancelable: true }
  //   );
  // };

  const callback = () => {
    let counter = 0;
    const intervalHandler = async () => {
      if (counter === 10) {
        clearInterval(interval);
        console.log('interval complete');
      } else {
        try {
          const data = await getTransportPositions();
          let updatedLatitude = data[data.length - 1].Position[1];
          let updatedLongitude = data[data.length - 1].Position[0];

          setDriverCoordinates(() => ({ latitude: updatedLatitude, longitude: updatedLongitude }));
        } catch (error) {
          alert('coudnt fetch driver position :(');
        }
      }

      counter++;
    };
    const interval = setInterval(intervalHandler, 3000);
  };

  return (
    <View style={{ flex: 1 }}>
      <ModalComponent setModalVisible={setModalVisible} modalVisible={modalVisible} ubicacion={locationLabel} destino={searchText} userData={userData} />
      {user === 'turista' && (
        <View style={styles.container}>
          <Text style={styles.text} onPress={() => callback()}>
            Hello {userData.name}!
          </Text>
          <Text style={styles.text} onPress={() => setModalVisible(true)}>
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
        <MapComponent
          location={location}
          destinationMarkerVisible={destinationMarkerVisible}
          destinationMarker={destinationMarker}
          user={user}
          mapRef={mapRef}
          driverCoordinates={driverCoordinates}
          driverMarkerIsVisible={driverMarkerIsVisible}
        />
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
