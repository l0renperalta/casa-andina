import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

const Localization = ({ route }) => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     // Fetch couldnt work if you dont set your ip address
  //     const res = await fetch(`http://192.168.1.10:5000/aws`);
  //     const data = await res.json();
  //     setData(data);
  //     console.log(data);
  //   })();
  // }, []);

  const renderPhotos = () => {
    const { photos } = route.params;

    return photos.map((photo) => (
      <Image
        style={styles.tinyLogo}
        key={photo.id}
        source={{
          uri: photo.uri,
        }}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <Text>Photos</Text>
      {/* {data.map((e) => (
        <Text key={e.id}>{e.titleCar}</Text>
      ))} */}
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
