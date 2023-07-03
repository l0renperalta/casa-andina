import { StyleSheet, Text, View, TextInput, ImageBackground } from 'react-native';
import { useState, useRef } from 'react';
import { loginTourist } from '../service';

const Login = ({ navigation }) => {
  const [values, setValues] = useState({ user: '', password: '' });
  const userRef = useRef();
  const passwordRef = useRef();

  const onChange = (name, text) => {
    setValues({ ...values, [name]: text });
  };

  const clearValues = () => {
    userRef.current.clear();
    passwordRef.current.clear();
  };

  const validateCredentials = async () => {
    const { message, data, userType } = await loginTourist(values);

    // console.log(message, data, userType);
    if (values.user === '' && values.password === '') {
      alert('Complete los campos');
    } else {
      if (userType === 'turista') {
        navigation.navigate('Home', {
          type: {
            user: 'turista',
            data: data,
          },
        });
        clearValues();
      }

      if (userType === 'conductor') {
        navigation.navigate('Home', {
          type: {
            user: 'conductor',
            data: data,
          },
        });
        clearValues();
      }

      if (values.user === 'Admin' && values.password === 'admin') {
        navigation.navigate('Admin');
        clearValues();
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../screens/fondo.png')} style={styles.backgroundImage}>
        <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }} onPress={() => validateCredentials()}>
          HOTEL LOS BALCONES
        </Text>
        <View style={styles.form}>
          <TextInput style={styles.input} ref={userRef} placeholder="Usuario" onChangeText={(text) => onChange('user', text)} />
          <TextInput style={styles.input} ref={passwordRef} placeholder="Contraseña" onChangeText={(text) => onChange('password', text)} secureTextEntry={true} />
          <Text style={styles.button} onPress={() => validateCredentials()}>
            Ingresar
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  form: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 20,
    color: 'white',
    backgroundColor: '#ffac1c',
    fontSize: 17,
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
