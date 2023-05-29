import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState, useRef } from 'react';
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

  const nombresRef = useRef();
  const apellidosRef = useRef();
  const dniRef = useRef();
  const marcaRef = useRef();
  const modeloRef = useRef();
  const placaRef = useRef();
  const colorRef = useRef();
  const asientosRef = useRef();

  const onChange = (name, input) => {
    setConductor({ ...conductor, [name]: input });
  };

  const clearInputs = () => {
    nombresRef.current.clear();
    apellidosRef.current.clear();
    dniRef.current.clear();
    marcaRef.current.clear();
    modeloRef.current.clear();
    placaRef.current.clear();
    colorRef.current.clear();
    asientosRef.current.clear();
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
      clearInputs();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        ref={nombresRef}
        placeholder="Nombres"
        onChangeText={(input) => onChange('nombres', input)}
      />
      <TextInput
        style={styles.input}
        ref={apellidosRef}
        placeholder="Apellidos"
        onChangeText={(input) => onChange('apellidos', input)}
      />
      <TextInput
        style={styles.input}
        ref={dniRef}
        placeholder="DNI o carnet de extranjeria"
        onChangeText={(input) => onChange('dni', input)}
        numeric
        keyboardType={'numeric'}
      />
      <TextInput
        style={styles.input}
        ref={marcaRef}
        placeholder="marca"
        onChangeText={(input) => onChange('marca', input)}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.smallInput}
          ref={modeloRef}
          placeholder="modelo"
          onChangeText={(input) => onChange('modelo', input)}
        />
        <TextInput
          style={styles.smallInput}
          ref={placaRef}
          placeholder="placa"
          onChangeText={(input) => onChange('placa', input)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.smallInput}
          ref={colorRef}
          placeholder="color"
          onChangeText={(input) => onChange('color', input)}
        />
        <TextInput
          style={styles.smallInput}
          ref={asientosRef}
          placeholder="asientos"
          onChangeText={(input) => onChange('asientos', input)}
          numeric
          keyboardType={'numeric'}
        />
      </View>
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
  smallInput: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    width: '42%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
