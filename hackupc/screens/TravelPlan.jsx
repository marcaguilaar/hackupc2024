import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { API_KEY } from '../constants/apikey'; //Unsplash API key
import { useNavigation } from '@react-navigation/native';

//COmponents
import Header from '../navigation/HeaderBack';
import ActivityItem from '../components/activityItem';

import { format, parse } from 'date-fns';

const TravelPlan = ({ route }) => {
    const { departureCity, arrivalCity, departureDate, returnDate } = route.params;
    console.log('TravelPlan: ', departureCity, arrivalCity, departureDate, returnDate);
    const [imageUrl, setImageUrl] = useState(null);
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);

    const navigation = useNavigation();


    useEffect(() => {
        const fetchJourneys = async () => {
            try {
                console.log('Empezamos a buscar actividades');
                const response = await fetch(`http://localhost:8000/activities/${arrivalCity}/${departureDate}/${returnDate}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                console.log('Result: ', result);
                setActivities(result.data);
            } catch (error) {
                setError(error.message);
            }
        };
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
        fetchImage();
        fetchJourneys();
    }, [arrivalCity, departureCity, returnDate]);



    let parsedDate1 = parse(departureDate, 'yyyy-MM-dd', new Date());
    const formattedDate1 = format(parsedDate1, 'MMM-dd');

    let parsedDate2 = parse(returnDate, 'yyyy-MM-dd', new Date());
    const formattedDate2 = format(parsedDate2, 'MMM-dd');


    return (
        <SafeAreaView style={styles.outercontainer}>
            <Header />
            <View style={styles.innerContainer}>

                <View style={styles.topRow}>
                    <View style={styles.destinationPod}>
                        <Text style={styles.title}>{arrivalCity}</Text>
                        <Text style={styles.subtitle}>{formattedDate1} - {formattedDate2}</Text>
                        <Text style={styles.subtitle}>Departure: {departureCity}</Text>
                        <Text style={styles.subtitle}>Bussiness Trip</Text>
                    </View>
                    <View style={styles.imagePod}>
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.image}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Planning')}>
                    <Text style={styles.buttonText}>Travel Plan</Text>
                </TouchableOpacity>
                <Text style={styles.sectionTitle}>Sing Up for Team Building!</Text>
                <FlatList
                    data={activities}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => 
                        <TouchableOpacity onPress={() => navigation.navigate('ActivityDetails', { name:item.name, description: item.description, location:item.city, date:item.date})}>
                            <ActivityItem activity={item.name} />
                        </TouchableOpacity>
                    }
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                /> 
            </View>
        </SafeAreaView>
    );
};

/* <FlatList
                    data={activities}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => 
                        <TouchableOpacity onPress={() => navigation.navigate('ActivityDetails', { activity: item })}>
                            <ActivityItem activity={item} />
                        </TouchableOpacity>
                    }
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                /> */

const styles = StyleSheet.create({
    outercontainer: {
        flex: 1,
        backgroundColor: '#012e99',
    },
    innerContainer: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    topRow: {
        flexDirection: 'row',
        marginBottom: 30,
        height: 150,
        justifyContent: 'space-between',
    },
    destinationPod: {
        width: '48%',
        borderWidth: 3,
        borderColor: '#012e99',
        borderRadius: 10,
        padding: 10,
    },
    imagePod: {
        width: '48%',
        height: 150,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#012e99',
    },

    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    activity: {
        fontSize: 16,
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#012e99',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 40,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TravelPlan;
