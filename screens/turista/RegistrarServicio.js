import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useState, useRef, useEffect, useContext } from 'react';
import { getAvalibleServices, registerService, sendTransportLocation } from '../../service';
import { useNavigation } from '@react-navigation/native';
import useInterval from '../../useInterval';
import { AppContext } from '../../AppContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegistrarServicios = ({ route }) => {
  const { user, setUser } = useContext(AppContext);

  const navigation = useNavigation();
  const [serviciosDisponibles, setServiciosDisponibles] = useState([]);
  const [showServices, setShowServices] = useState(false);

  const ubicacionRef = useRef();
  const destinoRef = useRef();
  const horaReservaRef = useRef();
  const niñosRef = useRef();
  const adultosRef = useRef();

  const [servicio, setServicio] = useState({
    id: user.data.id,
    ubicacion: '',
    destino: '',
    horaReserva: null,
    niños: 0,
    adultos: 0,
  });

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (user.userType === 'conductor') {
      navigation.setOptions({ headerTitle: 'Traslados disponibles' });
      setShowServices(true);
      getAvalibleServices().then((data) => setServiciosDisponibles(data));
    }
  }, []);

  const onChange = (name, input) => {
    setServicio({ ...servicio, [name]: input });
  };

  const validateFieldsHandler = async () => {
    if (!servicio.horaReserva) {
      alert('Complete los campos');
    } else {
      registerService({
        id: user.data.id,
        ubicacion: route.params.ubicacion,
        destino: route.params.destino,
        horaReserva: servicio.horaReserva,
        niños: route.params.niños,
        adultos: route.params.adultos,
      });

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

  // Global Contexts
  const { serviceAccepted, setServiceAccepted } = useContext(AppContext);
  const { serviceData, setServiceData } = useContext(AppContext);

  const serviceHandler = async (service) => {
    setServiceAccepted(true);

    let counter = 0;
    const intervalHandler = () => {
      if (counter === 15) {
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
    const interval = setInterval(intervalHandler, 2500);

    // console.log(service);
    // setServiceData({
    //   displayModal: true,
    //   ubicacion: service.ubicacion,
    //   destino: service.destino,
    //   horaReserva: service.horaReserva,
    //   niños: service.ninos,
    //   adultos: service.adultos,
    // });
    // navigation.goBack();
  };

  const serviceDetails = (id) => {
    const service = serviciosDisponibles.find((e) => e.id === id);
    console.log(service);
    Alert.alert(
      //title
      'Ubicacion: ' + service.ubicacion + ' - Destino: ' + service.destino,
      //body
      'Adultos: ' + service.adultos + ' - Niños: ' + service.ninos + ' - Hora: ' + service.hora_reserva,
      [
        {
          text: 'Aceptar',
          onPress: () => serviceHandler(service),
        },
        {
          text: 'Cancelar',
          onPress: () => console.log('No acceptado'),
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
            </View>
          ))}
        </>
      ) : (
        <>
          <TextInput style={styles.input} placeholder="Ubicacion" ref={ubicacionRef} editable={false} defaultValue={`${route.params?.ubicacion}`} />
          <TextInput style={styles.input} placeholder="Destino" ref={destinoRef} editable={false} defaultValue={`${route.params?.destino}`} />
          <TextInput
            style={styles.input}
            placeholder="Hora de reserva"
            onChangeText={(input) => onChange('horaReserva', input)}
            numeric
            keyboardType={'numeric'}
            ref={horaReservaRef}
          />
          {/* <Text style={styles.button} onPress={() => setShowPicker(!showPicker)}>
            Hora
          </Text>
          {showPicker && <DateTimePicker mode="time" display="spinner" value={date} />} */}
          <TextInput style={styles.input} placeholder="Niños" numeric keyboardType={'numeric'} ref={niñosRef} editable={false} defaultValue={`${route.params?.niños}`} />
          <TextInput
            style={styles.input}
            placeholder="Adultos"
            numeric
            keyboardType={'numeric'}
            ref={adultosRef}
            editable={false}
            defaultValue={`${route.params?.adultos}`}
          />
          <Text style={styles.button} onPress={() => validateFieldsHandler()}>
            Registrar Servicio
          </Text>
        </>
      )}
    </View>
  );
};

// useInterval(() => {
//   sendTransportLocation({
//     latitude: -16.399884822698212,
//     longitude: -71.53550966370722,
//   });
//   transportCoordinates.latitude += 0.0001;
//   transportCoordinates.longitude += 0.00004;
// }, 3000);

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
