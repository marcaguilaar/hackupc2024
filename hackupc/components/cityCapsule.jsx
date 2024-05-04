import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { API_KEY } from '../constants/apikey'; //Unsplash API key

const CityCapsule = ({ departureCity, arrivalCity, departureDate, returnDate }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        fetchImage();
    }, []);

    const fetchImage = async () => {
        try {
        const response = await fetch(
            `https://api.unsplash.com/photos/random?query=${arrivalCity}&client_id=${API_KEY}`
        );
        const data = await response.json();
        setImageUrl(data.urls.regular);
        } catch (error) {
        console.error('Error fetching image:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: imageUrl }} style={styles.imageBackground}>
                <View style={styles.overlay}>
                    <Text style={styles.cityName}>{arrivalCity}</Text>
                    <Text style={styles.dates}>{departureDate} - {returnDate}</Text>
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
