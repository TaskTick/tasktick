import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { HOST } from "./models/network"
import SignIn from './models/SignIn';
import Home from './models/Home';
import SignUp from './models/SignUp';
const Stack = createNativeStackNavigator();
const checkConnection = async () => {

  const resp = await axios.get(`${HOST}/login/`).catch(err => err)
  if (resp.data.error) {
    console.log(resp.data.error)
    return
  }
  console.log(resp.data)
}

export default function App() {
  checkConnection();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignIn'>
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
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
