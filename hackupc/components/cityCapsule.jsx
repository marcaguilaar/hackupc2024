import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const CityCapsule = ({ city, dates, image }) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: image }} style={styles.imageBackground}>
                <View style={styles.overlay}>
                    <Text style={styles.cityName}>{city}</Text>
                    <Text style={styles.dates}>{dates}</Text>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 150,
        borderRadius: 12,
        overflow: 'hidden',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark semi-transparent overlay
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    cityName: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    dates: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default CityCapsule;
