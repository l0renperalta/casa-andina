import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './Login';
import Admin from './administrador/Admin';
import RegistrarTurista from './administrador/RegistrarTurista';
import RegistrarConductor from './administrador/RegistrarConductor';

import FacialRecognition from './turista/FacialRecognition';
import CameraRoll from './turista/CameraRoll';
import Map from './turista/Map';

import Ionicons from 'react-native-vector-icons/Ionicons';
import RegistrarServicio from './turista/RegistrarServicio';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home({ route }) {
  const { type } = route.params;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: '#28241c',
        },
        headerTintColor: '#ffffff',
        tabBarStyle: { backgroundColor: '#28241c' },
        tabBarActiveTintColor: '#ffac1c',
      }}
    >
      <Tab.Screen
        name="Hotel Los Balcones"
        component={Map}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
        initialParams={{ type: type }}
      />
      <Tab.Screen
        name="FacialRecognition"
        component={FacialRecognition}
        options={({ navigation }) => ({
          headerTitle: 'Hotel Los Balcones',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />,
        })}
      />
      <Tab.Screen
        name="CameraRoll"
        component={CameraRoll}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="location-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="RegistrarServicio"
        component={RegistrarServicio}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="location-outline" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

function Conductor() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={Inicio} />
    </Tab.Navigator>
  );
}

const Welcome = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="RegistrarTurista" component={RegistrarTurista} />
        <Stack.Screen name="RegistrarConductor" component={RegistrarConductor} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Conductor" component={Conductor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Welcome;
