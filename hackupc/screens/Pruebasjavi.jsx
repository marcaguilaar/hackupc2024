import React from 'react';
import { StyleSheet, View, Text, TextInput, Image } from 'react-native';


import logoTravel from './hackupc/assets/LogoTravel.png';
import logoUpc from './hackupc/assets/logoHackUpc.png';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={logoTravel} // Reemplaza con la URL de tu logo superior
        style={styles.logo}
      />
      <Image
        source={logoUpc} // Reemplaza con la URL de tu segundo logo
        style={styles.logo}
      />
      <Text style={styles.loginText}>Login</Text>
      <TextInput
        placeholder="Usuario"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry={true}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    borderRadius: 5,
  }
});

export default LoginScreen;
