import { StyleSheet, Text, View, Modal } from 'react-native';

const ModalComponent = ({ setIsVisible, isVisible, adultos, ninos }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <View flexDirection="row">
            <Text style={styles.button} backgroundColor="#ffac1c" onPress={() => setIsVisible(false)}>
              Adquirir servicio
            </Text>
            <Text style={styles.button} backgroundColor="#88a4fc">
              Reservar servicio
            </Text>
          </View>
        </View>
        <Text style={styles.text}>Ubicacion: </Text>
        <Text style={styles.text}>Destino: </Text>
        <Text style={styles.text}>Adultos: {adultos}</Text>
        <Text style={styles.text}>Niños: {ninos}</Text>
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
