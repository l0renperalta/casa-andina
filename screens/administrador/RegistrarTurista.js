import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';

const RegistrarTurista = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nombres" onChangeText={(text) => onChange('user', text)} />
      <TextInput style={styles.input} placeholder="Apellidos" onChangeText={(text) => onChange('password', text)} />
      <TextInput style={styles.input} placeholder="DNI o carnet de extranjeria" onChangeText={(text) => onChange('password', text)} />
      <TextInput style={styles.input} placeholder="Nacionalidad" onChangeText={(text) => onChange('password', text)} />
      <TextInput style={styles.input} placeholder="Niños" onChangeText={(text) => onChange('password', text)} />
      <TextInput style={styles.input} placeholder="Nacionalidad" onChangeText={(text) => onChange('password', text)} />
      <TextInput style={styles.input} placeholder="Adultos" onChangeText={(text) => onChange('password', text)} />
      <Text style={styles.button} onPress={() => validateCredentials()}>
        Registrar Turista
      </Text>
    </View>
  );
};

export default RegistrarTurista;

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
    width: '90%',
  },
});
