import React, { useState, useEffect } from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";

//Components
import Header from "../navigation/Header";
import CityCapsule from "../components/cityCapsule";

//Constants
import { getEmail } from "../constants/user";



const ItemSeparator = () => <View style={styles.separator} />;


export default function Home({ navigation }) {
    const [journeys, setJourneys] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJourneys = async () => {
            try {
                const get = getEmail();
                console.log(get);
                const response = await fetch(`http://localhost:8000/users/${get}/journeys`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setJourneys(result.data.journeys);
                console.log('Journeys after: ',journeys);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchJourneys();
    }, []);

    if (error) {
        return <SafeAreaView><Text>Error: {error}</Text></SafeAreaView>;
    }



    return (
        <SafeAreaView style={styles.outercontainer}>
            <Header />
            <View style={styles.innerContainer}>
                <Text style={styles.myTravel}>My Trips</Text>
                <FlatList
                    data={journeys}
                    keyExtractor={(item) => `journey-${item.tripID}`}  // Use tripID as the key
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('TravelPlan', {
                                tripID: item.tripID,  // Pass tripID
                                departureCity: item.departureCity,
                                arrivalCity: item.arrivalCity,
                                departureDate: item.departureDate,
                                returnDate: item.returnDate,
                            })}
                        >
                            <CityCapsule 
                                departureCity={item.departureCity}
                                arrivalCity={item.arrivalCity}
                                departureDate={item.departureDate}
                                returnDate={item.returnDate}
                            />
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={ItemSeparator}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainer}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = {
    outercontainer: {
        flex: 1,
        backgroundColor: '#012e99',
    },
    innerContainer: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    myTravel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#134fcc", 
        marginBottom: 25,
    },
    contentContainer: {
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    separator: {
        height: 20,
    },

};