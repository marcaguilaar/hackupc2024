import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Pruebas() {
    const navigation = useNavigation();

    const handlePruebas = () => {
        alert('¡Botón presionado!');
        navigation.navigate('Pruebas2');
    }


  return (
    <View>
      <Text>Pruebas</Text>
        <TouchableOpacity onPress={handlePruebas}>
            <Text>Pruebas</Text>
        </TouchableOpacity>
    </View>
  );
}