import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState, useRef } from 'react';
import { registerService } from '../../service';

const RegistrarServicios = ({ route }) => {
  const { id } = route.params;

  const ubicacionRef = useRef();
  const destinoRef = useRef();
  const horaReservaRef = useRef();
  const niñosRef = useRef();
  const adultosRef = useRef();

  const [servicio, setServicio] = useState({
    id: id,
    ubicacion: '',
    destino: '',
    horaReserva: null,
    niños: 0,
    adultos: 0,
  });

  const onChange = (name, input) => {
    setServicio({ ...servicio, [name]: input });
  };

  const validateFieldsHandler = async () => {
    if (!servicio.ubicacion || !servicio.destino || !servicio.horaReserva || !servicio.niños || !servicio.adultos) {
      alert('Complete los campos');
    } else {
      registerService(servicio);
      // console.log(servicio);
      alert('Servicio registrado exitosamente!!');

      ubicacionRef.current.clear();
      destinoRef.current.clear();
      horaReservaRef.current.clear();
      niñosRef.current.clear();
      adultosRef.current.clear();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Ubicacion" onChangeText={(input) => onChange('ubicacion', input)} ref={ubicacionRef} />
      <TextInput style={styles.input} placeholder="Destino" onChangeText={(input) => onChange('destino', input)} ref={destinoRef} />
      <TextInput
        style={styles.input}
        placeholder="Hora de reserva"
        onChangeText={(input) => onChange('horaReserva', input)}
        numeric
        keyboardType={'numeric'}
        ref={horaReservaRef}
      />
      <TextInput style={styles.input} placeholder="Niños" onChangeText={(input) => onChange('niños', input)} numeric keyboardType={'numeric'} ref={niñosRef} />
      <TextInput style={styles.input} placeholder="Adultos" onChangeText={(input) => onChange('adultos', input)} numeric keyboardType={'numeric'} ref={adultosRef} />
      <Text style={styles.button} onPress={() => validateFieldsHandler()}>
        Registrar Turista
      </Text>
    </View>
  );
};

export default RegistrarServicios;

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
