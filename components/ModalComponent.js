import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { registerService } from '../service';
import { useNavigation } from '@react-navigation/native';

const ModalComponent = ({ setModalVisible, modalVisible, ubicacion, destino, userData }) => {
  const navigation = useNavigation();

  const { adultos, ninos, id } = userData;

  const adquireServiceHandler = () => {
    registerService({
      id,
      adultos,
      niños: ninos,
      ubicacion,
      destino,
    });

    alert('servicio registrado!');
    setModalVisible(false);
    // const fecha = new Date();
    // fecha.setHours(fecha.getHours());
    // console.log(fecha);
  };

  const reserveServiceHandler = () => {
    navigation.navigate('RegistrarServicio', {
      id: id,
    });
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <View flexDirection="row">
              <Text style={styles.button} backgroundColor="#ffac1c" onPress={() => adquireServiceHandler()}>
                Adquirir servicio
              </Text>
              <Text style={styles.button} backgroundColor="#88a4fc" onPress={() => reserveServiceHandler()}>
                Reservar servicio
              </Text>
            </View>
          </View>
          <Text style={styles.text}>Ubicacion: {ubicacion}</Text>
          <Text style={styles.text}>Destino: {destino}</Text>
          <Text style={styles.text}>Adultos: {adultos}</Text>
          <Text style={styles.text}>Niños: {ninos}</Text>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    backgroundColor: '#28241c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    color: 'white',
    marginHorizontal: 5,
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
  text: {
    color: 'white',
    marginLeft: 20,
    marginTop: 4,
    marginBottom: 2,
  },
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '40%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});
