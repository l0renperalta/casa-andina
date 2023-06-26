import { StyleSheet, Image } from 'react-native';
import { Marker } from 'react-native-maps';

const DriverMarker = ({ driverCoordinates }) => {
  const { latitude, longitude } = driverCoordinates;
  return (
    <Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
    >
      <Image source={require('../screens/turista/car.png')} style={{ height: 35, width: 35 }} />
    </Marker>
  );
};

export default DriverMarker;

const styles = StyleSheet.create({});
