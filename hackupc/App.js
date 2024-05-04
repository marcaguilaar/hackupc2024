import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


//Pantallas
import Pruebas from './screens/Pruebas';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pruebas" component={Pruebas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/aptos.ttf"),
    light: require("./assets/fonts/aptos-light.ttf"),
    bold: require("./assets/fonts/aptos-bold.ttf"),
    semibold: require("./assets/fonts/aptos-semibold.ttf"),
    extraBold: require("./assets/fonts/aptos-extrabold.ttf"),
    black: require("./assets/fonts/aptos-black.ttf"),
  });
}

if(!fontsLoaded) return null;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
