import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import { registerConductor, registerVehiculo } from '../../service';

const RegistrarConductor = () => {
  const [conductor, setConductor] = useState({
    nombres: '',
    apellidos: '',
    dni: 0,
    marca: '',
    modelo: '',
    placa: '',
    color: '',
    asientos: 0,
  });

  const onChange = (name, input) => {
    setConductor({ ...conductor, [name]: input });
  };

  const validateFieldsHandler = async () => {
    if (
      !conductor.nombres ||
      !conductor.apellidos ||
      !conductor.dni ||
      !conductor.marca ||
      !conductor.modelo ||
      !conductor.placa ||
      !conductor.color ||
      !conductor.asientos
    ) {
      alert('Complete los campos');
    } else {
      registerConductor(conductor);
      alert('Conductor registrado exitosamente!!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nombres" onChangeText={(input) => onChange('nombres', input)} />
      <TextInput style={styles.input} placeholder="Apellidos" onChangeText={(input) => onChange('apellidos', input)} />
      <TextInput style={styles.input} placeholder="DNI o carnet de extranjeria" onChangeText={(input) => onChange('dni', input)} numeric keyboardType={'numeric'} />
      <TextInput style={styles.input} placeholder="marca" onChangeText={(input) => onChange('marca', input)} />
      <TextInput style={styles.input} placeholder="modelo" onChangeText={(input) => onChange('modelo', input)} />
      <TextInput style={styles.input} placeholder="placa" onChangeText={(input) => onChange('placa', input)} />
      <TextInput style={styles.input} placeholder="color" onChangeText={(input) => onChange('color', input)} />
      <TextInput style={styles.input} placeholder="asientos" onChangeText={(input) => onChange('asientos', input)} numeric keyboardType={'numeric'} />
      <Text style={styles.button} onPress={() => validateFieldsHandler()}>
        Registrar Conductor
      </Text>
    </View>
  );
};

export default RegistrarConductor;

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
