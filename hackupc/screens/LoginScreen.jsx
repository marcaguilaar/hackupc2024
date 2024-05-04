import React from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';

//components
//import Header from "../navigation/Header";

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.outercontainer}>
        <View style={styles.innerContainer}>
        <View style={styles.separator}></View>
            <Image
                source={require('../assets/travelperkIcon.jpeg')}
                style={{ width: 325, height: 100, marginBottom: 100} }
            />
            <View style={styles.box}>
                <Text style={styles.boxText}>Demo 1</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.boxText}>Demo 2</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.boxText}>Demo 3</Text>
            </View>
        </View>
    </SafeAreaView>
  );
};

const styles = {
    outercontainer: {
      flex: 1,
      backgroundColor: '#012e99',
    },
    innerContainer: {
      padding: 20,
      flex: 1,
      backgroundColor: '#012e99',
      justifyContent: 'center',
      alignItems: 'center',
    },

    box: {
      width: 300,
      height: 75,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      borderRadius: 20,
    },
    boxText: {
      color: '#012e99',
      fontSize: 24,
      fontWeight: 'bold',
    },
    separator: {
      height: 0,
  },
}

