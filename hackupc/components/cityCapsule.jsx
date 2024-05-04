import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { API_KEY } from '../constants/apikey'; //Unsplash API key

import { format, parse } from 'date-fns';

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

    let parsedDate1 = parse(departureDate, 'yyyy-MM-dd', new Date());
    const formattedDate1 = format(parsedDate1, 'MMM-dd');

    let parsedDate2 = parse(returnDate, 'yyyy-MM-dd', new Date());
    const formattedDate2 = format(parsedDate2, 'MMM-dd');

    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: imageUrl }} style={styles.imageBackground}>
                <View style={styles.overlay}>
                    <Text style={styles.cityName}>{arrivalCity}</Text>
                    <Text style={styles.dates}>{formattedDate1} - {formattedDate2}</Text>
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
