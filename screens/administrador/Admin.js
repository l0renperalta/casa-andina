import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Admin = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.button} onPress={() => navigation.navigate('RegistrarTurista')}>
        REGISTRAR TURISTA
      </Text>
      <Text style={styles.button} backgroundColor="#88a4fc" onPress={() => navigation.navigate('RegistrarConductor')}>
        REGISTRAR CONDUCTOR
      </Text>
      <Text style={styles.button}>REGISTRAR CAMIONETA</Text>
      <Text style={styles.button} backgroundColor="#ffffff" onPress={() => navigation.navigate('Login')}>
        SALIR
      </Text>
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
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    color: 'black',
    backgroundColor: '#ffac1c',
    margin: 10,
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
