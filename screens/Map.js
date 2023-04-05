import { StyleSheet, Text, View, Image } from 'react-native';
import MapView from 'react-native-maps';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const Map = ({ route }) => {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log(text)
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}
      />
      <Text>{text}</Text>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '50%',
  }, 
});
