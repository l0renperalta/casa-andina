import { StyleSheet, View, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import DriverMarker from './DriverMarker';

const MapComponent = ({ user, location, destinationMarkerVisible, destinationMarker, mapRef, driverCoordinates, driverMarkerIsVisible }) => {
  // SETINTERVAL CODE
  //   const toggleTrackerPositions = async () => {
  //     if (!showTrackerPositions) {
  //       setShowTrackerPositions(true);
  //     } else {
  //       setShowTrackerPositions(false);
  //     }

  //     setTrackerCoordinates((prevState) => ({
  //       latitude: prevState.latitude + 0.0001,
  //       longitude: prevState.longitude + 0.00004,
  //     }));

  //     try {
  //       const data = await getTransportPositions();

  //       setTrackerCoordinates({
  //         latitude: data[1].Position[1],
  //         longitude: data[1].Position[0],
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
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
          latitude: -16.39709074556277,
          longitude: -71.53657338404636,
        }}
        title="Tu estas aqui"
        description="Tu Ubicacion actual"
      >
        <Image source={require('../screens/turista/ubicacion.png')} style={{ height: 30, width: 30 }} />
      </Marker>
      {destinationMarkerVisible && destinationMarker()}

      {driverMarkerIsVisible && <DriverMarker driverCoordinates={driverCoordinates} />}

      {/* <Polyline coordinates={[{ latitude: location.latitude, longitude: location.longitude }, destination]} strokeColor="#000" strokeWidth={2} /> */}
    </MapView>
  );
};

export default MapComponent;

const styles = StyleSheet.create({});
