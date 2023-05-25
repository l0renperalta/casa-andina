import { StyleSheet, Text, View, TextInput, Modal, Pressable } from 'react-native';

const ModalComponent = ({ setIsVisible, isVisible }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>Ubicacion: </Text>
          <Text style={styles.text}>Destino: </Text>
          <View flexDirection="row">
            <Text style={styles.button} backgroundColor="#ffac1c">
              Adquirir servicio
            </Text>
            <Text style={styles.button} backgroundColor="#88a4fc" onPress={() => setIsVisible(false)}>
              Reservar servicio
            </Text>
          </View>
        </View>
        <Text style={styles.title}>Datos del conductor</Text>
        <Text style={styles.text}>Conductor: </Text>
        <Text style={styles.text}>Color: </Text>
        <Text style={styles.text}>Placa: </Text>
        <Text style={styles.text}>Modelo: </Text>
      </View>
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
