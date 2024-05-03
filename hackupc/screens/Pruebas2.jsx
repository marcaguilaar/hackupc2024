import React from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function Pruebas2() {
  const handlePress = () => {
    alert('¡Botón presionado!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenido a la Pantalla de Pruebas</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Información Importante</Text>
        <Text style={styles.cardContent}>Aquí puede ir algún texto relevante para los usuarios.</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Presiona Aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
