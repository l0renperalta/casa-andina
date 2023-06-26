import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useState, useRef, useEffect, useContext } from 'react';
import { getAvalibleServices, registerService, sendTransportLocation } from '../../service';
import { useNavigation } from '@react-navigation/native';
import useInterval from '../../useInterval';
import { AppContext } from '../../AppContext';

const RegistrarServicios = ({ route }) => {
  const id = route.params?.id;

  const navigation = useNavigation();
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);
  const [showServices, setShowServices] = useState(false);

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

  useEffect(() => {
    if (id) {
      navigation.setOptions({ headerTitle: 'Traslados disponibles' });
      setShowServices(true);
      getAvalibleServices().then((data) => setServiciosDisponibles(data));
    }
  }, []);

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

  const transportCoordinates = {
    latitude: -16.3997848226982,
    longitude: -71.5354696637072,
  };

  const { serviceAccepted, setServiceAccepted } = useContext(AppContext);

  const serviceHandler = async () => {
    // useInterval(() => {
    //   sendTransportLocation({
    //     latitude: -16.399884822698212,
    //     longitude: -71.53550966370722,
    //   });
    //   transportCoordinates.latitude += 0.0001;
    //   transportCoordinates.longitude += 0.00004;
    // }, 3000);

    // ESTE ESTABA DESCOMENTADO, ESTABA USANDO ESTE CODIGO COMENTADO
    setServiceAccepted(true);

    let counter = 0;
    const intervalHandler = () => {
      if (counter === 5) {
        clearInterval(interval);
        console.log('interval complete');
      } else {
        sendTransportLocation({ latitude: transportCoordinates.latitude, longitude: transportCoordinates.longitude });
        // console.log(transportCoordinates);
      }
      transportCoordinates.latitude += 0.0001;
      transportCoordinates.longitude += 0.00004;
      counter++;
    };
    const interval = setInterval(intervalHandler, 10000);
  };

  const serviceDetails = (id) => {
    const service = serviciosDisponibles.find((e) => e.id === id);

    Alert.alert(
      //title
      'Servicio',
      //body
      'ubicacion: ' + service.ubicacion,
      [
        {
          text: 'Aceptar',
          onPress: () => serviceHandler(),
        },
        {
          text: 'Cancelar',
          onPress: () => console.log('Not accepted'),
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {showServices ? (
        <>
          {serviciosDisponibles.map((servicio) => (
            <View style={styles.serviciosContainer} key={servicio.id}>
              <Text>{servicio.destino}</Text>
              <Text style={styles.button} onPress={() => serviceDetails(servicio.id)}>
                Detalles
              </Text>
              {/* <Text style={styles.button} onPress={() => serviceDetails(servicio.id)}>
                Detalles
              </Text> */}
            </View>
          ))}
        </>
      ) : (
        <>
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
            Registrar Servicio
          </Text>
        </>
      )}
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
  serviciosContainer: {
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
    padding: 5,
    margin: 10,
  },
});
