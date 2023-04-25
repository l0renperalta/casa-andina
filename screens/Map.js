import { StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const Map = ({ route }) => {
  const [location, setLocation] = useState(null);
  const [locationLoaded, setLocationLoaded] = useState(false);

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

  return (
    <View style={{ flex: 1 }}>
      {locationLoaded && (
        <MapView
          style={{ flex: 1 }}
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
        </MapView>
      )}
      {!locationLoaded && <Text>Turn on your location</Text>}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({});
