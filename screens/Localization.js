import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const Localization = ({ route }) => {
  const { photos } = route.params;
  console.log(photos);
  return (
    <View style={styles.container}>
      <Text>Photos</Text>
      {photos.map((photo) => (
        <Image
          style={styles.tinyLogo}
          key={photo.id}
          source={{
            uri: photo.uri,
          }}
        />
      ))}
    </View>
  );
};

export default Localization;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
});
