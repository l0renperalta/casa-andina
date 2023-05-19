import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react';

const Login = ({ navigation }) => {
  const [values, setValues] = useState({ user: '', password: '' });

  const onChange = (name, text) => {
    setValues({ ...values, [name]: text });
  };

  const validateCredentials = () => {
    if (values.user === 'Admin' && values.password === 'admin') {
      navigation.navigate('Admin');
    }
    if (values.user === 'Rony' && values.password === 'rony') {
      navigation.navigate('Home');
    }
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Usuario" onChangeText={(text) => onChange('user', text)} />
      <TextInput style={styles.input} placeholder="Contraseña" onChangeText={(text) => onChange('password', text)} secureTextEntry={true} />
      <Text style={styles.button} onPress={() => validateCredentials()}>
        Ingresar
      </Text>
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
