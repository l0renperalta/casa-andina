import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState, useRef } from 'react';
import { registerTourist } from '../../service';

const RegistrarTurista = () => {
  const nombresRef = useRef();
  const apellidosRef = useRef();
  const dniRef = useRef();
  const nacionalidadRef = useRef();
  const niñosRef = useRef();
  const adultosRef = useRef();

  const [turista, setTurista] = useState({
    nombres: '',
    apellidos: '',
    dni: 0,
    nacionalidad: '',
    niños: 0,
    adultos: 0,
  });

  const onChange = (name, input) => {
    setTurista({ ...turista, [name]: input });
  };

  const validateFieldsHandler = async () => {
    if (
      !turista.nombres ||
      !turista.apellidos ||
      !turista.dni ||
      !turista.nacionalidad ||
      !turista.niños ||
      !turista.adultos
    ) {
      alert('Complete los campos');
    } else {
      registerTourist(turista);
      alert('Turista registrado exitosamente!!');

      nombresRef.current.clear();
      apellidosRef.current.clear();
      dniRef.current.clear();
      nacionalidadRef.current.clear();
      niñosRef.current.clear();
      adultosRef.current.clear();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombres"
        onChangeText={(input) => onChange('nombres', input)}
        ref={nombresRef}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        onChangeText={(input) => onChange('apellidos', input)}
        ref={apellidosRef}
      />
      <TextInput
        style={styles.input}
        placeholder="DNI o carnet de extranjeria"
        onChangeText={(input) => onChange('dni', input)}
        numeric
        keyboardType={'numeric'}
        ref={dniRef}
      />
      <TextInput
        style={styles.input}
        placeholder="Nacionalidad"
        onChangeText={(input) => onChange('nacionalidad', input)}
        ref={nacionalidadRef}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.smallInput}
          placeholder="Niños"
          onChangeText={(input) => onChange('niños', input)}
          numeric
          keyboardType={'numeric'}
          ref={niñosRef}
        />
        <TextInput
          style={styles.smallInput}
          placeholder="Adultos"
          onChangeText={(input) => onChange('adultos', input)}
          numeric
          keyboardType={'numeric'}
          ref={adultosRef}
        />
      </View>
      <Text style={styles.button} onPress={() => validateFieldsHandler()}>
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
