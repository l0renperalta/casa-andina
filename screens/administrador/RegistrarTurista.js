import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState, useRef } from 'react';
import { registerTourist } from '../../service';

const RegistrarTurista = () => {
  const [turista, setTurista] = useState({
    nombres: '',
    apellidos: '',
    dni: 0,
    nacionalidad: '',
    niños: 0,
    adultos: 0,
  });

  const textInputRefs = useRef([]);

  const onChange = (name, input) => {
    setTurista({ ...turista, [name]: input });
  };

  const validateFieldsHandler = async () => {
    console.log(turista);
    if (!turista.nombres || !turista.apellidos || !turista.dni || !turista.nacionalidad || !turista.niños || !turista.adultos) {
      alert('Complete los campos');
    } else {
      registerTourist(turista);

      textInputRefs.current.forEach((ref) => {
        if (ref.current) {
          ref.current.clear();
        }
      });

      alert('Turista registrado exitosamente!!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} ref={(ref) => (textInputRefs.current[0] = ref)} placeholder="Nombres" onChangeText={(input) => onChange('nombres', input)} />
      <TextInput style={styles.input} ref={(ref) => (textInputRefs.current[0] = ref)} placeholder="Apellidos" onChangeText={(input) => onChange('apellidos', input)} />
      <TextInput
        style={styles.input}
        ref={(ref) => (textInputRefs.current[0] = ref)}
        placeholder="DNI o carnet de extranjeria"
        onChangeText={(input) => onChange('dni', input)}
        numeric
        keyboardType={'numeric'}
      />
      <TextInput
        style={styles.input}
        ref={(ref) => (textInputRefs.current[0] = ref)}
        placeholder="Nacionalidad"
        onChangeText={(input) => onChange('nacionalidad', input)}
      />
      <TextInput
        style={styles.input}
        ref={(ref) => (textInputRefs.current[0] = ref)}
        placeholder="Niños"
        onChangeText={(input) => onChange('niños', input)}
        numeric
        keyboardType={'numeric'}
      />
      <TextInput
        style={styles.input}
        ref={(ref) => (textInputRefs.current[0] = ref)}
        placeholder="Adultos"
        onChangeText={(input) => onChange('adultos', input)}
        numeric
        keyboardType={'numeric'}
      />
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
});
