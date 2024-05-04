import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { API_KEY } from '../constants/apikey'; //Unsplash API key
import { useNavigation } from '@react-navigation/native';

//COmponents
import Header from '../navigation/HeaderBack';
import ActivityItem from '../components/activityItem';

const TravelPlan = ({ route }) => {
    const { departureCity, arrivalCity, departureDate, returnDate } = route.params;
    const [imageUrl, setImageUrl] = useState(null);

    const navigation = useNavigation();


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
        <SafeAreaView style={styles.outercontainer}>
            <Header />
            <View style={styles.innerContainer}>

                <View style={styles.topRow}>
                    <View style={styles.destinationPod}>
                        <Text style={styles.title}>{arrivalCity}</Text>
                        <Text style={styles.subtitle}>{departureDate} - {returnDate}</Text>
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
