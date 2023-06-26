import { StyleSheet } from 'react-native';
import Welcome from './screens/Welcome';
import { AppContextProvider } from './AppContext';

export default function App() {
  return (
    <AppContextProvider>
      <Welcome />
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
