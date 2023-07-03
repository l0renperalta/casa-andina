import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';

const Admin = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../fondo.png')} style={styles.backgroundImage}>
        <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold', marginBottom: 30 }} onPress={() => validateCredentials()}>
          HOTEL LOS BALCONES
        </Text>
        <Text style={styles.button} onPress={() => navigation.navigate('RegistrarTurista')}>
          REGISTRAR TURISTA
        </Text>
        <Text style={styles.button} backgroundColor="#88a4fc" onPress={() => navigation.navigate('RegistrarConductor')}>
          REGISTRAR CONDUCTOR
        </Text>
        <Text style={styles.button}>REPORTE DE CAMIONETA</Text>
        <Text style={styles.button} backgroundColor="#ffffff" onPress={() => navigation.navigate('Login')}>
          SALIR
        </Text>
      </ImageBackground>
    </View>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    color: 'black',
    backgroundColor: '#ffac1c',
    margin: 30,
    width: 250,
    textAlign: 'center',
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
});
