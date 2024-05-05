import React, {useState, useEffect} from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { API_KEY } from "../constants/apikey";


//Components
import Header from "../navigation/HeaderBack";
import HeroImage from "../components/heroImage";
import { format, parseISO } from 'date-fns';

//PopUps
import SignUpModal from "../popUps/signUpModal";

const ActivityDetails = ({ route }) => {
    const { name, description, location, date } = route.params;
    console.log('ActivityDetails: ', name, description, location, date);
    const navigation = useNavigation();
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [cityName, setCityName] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
            const response = await fetch(
                `https://api.unsplash.com/photos/random?query=${name}&client_id=${API_KEY}`
            );
            const data = await response.json();
            setImageUrl(data.urls.regular);
            } catch (error) {
            console.error('Error fetching image:', error);
            }
        };
    
        const fetchCityInfo = async () => {
            try {
            const response = await fetch(`http://localhost:8000/cities/${location}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log('Result: ', result.data.name);
            setCityName(result.data.name);
            } catch (error) {
            setError(error.message);
            }
        };
        fetchCityInfo();
        fetchImage();
    }, [location]);



    const handleSignUp = () => {
        setPopupVisible(true);
        setTimeout(() => {
            navigation.goBack();
            setPopupVisible(false);
        }, 1400); // Close popup after 1 second
    };

    const parsedDate = parseISO(date);
    const formattedDate = format(parsedDate, 'MMMM d, h:mm a');


    return (
        <SafeAreaView style={styles.outercontainer}>
            <Header />
            <View style={styles.innerContainer}>
                <HeroImage image={imageUrl} />
                <Text style={styles.title}>{name}</Text>
                <ScrollView style={styles.descriptionRow}>
                    <Text style={styles.description}>{description}</Text>
                </ScrollView>
                <TouchableOpacity style={styles.linkedText}>
                    <Ionicons name="location" size={24} color="#012e99" />
                    <Text style={styles.locationText}>{cityName}</Text>
                </TouchableOpacity>
                <View style={styles.row}>
                    <Text style={styles.dateTime}>{formattedDate}</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonTextS}>Add to calendar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.enterRow}>
                    <TouchableOpacity style={styles.buttonWhite}>
                        <Text style={styles.blueText}>Check Participants</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.enterRow}>
                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonTextL}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <SignUpModal visible={isPopupVisible} onClose={() => setPopupVisible(false)} />
        </SafeAreaView>
    );
}

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
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: "#134fcc",
    },
    linkedText: {
        color: 'blue',
        flexDirection: 'row',
    },
    row: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#134fcc',
        padding: 10,
        borderRadius: 10,
    },
    description: {
        marginTop: 10,
        fontSize: 16,
    },
    descriptionRow: {
        marginBottom: 25,
        maxHeight: 125
    },
    locationText: {
        fontSize: 20,
        marginLeft: 10,
        color: "#134fcc",
        fontWeight: 'bold',
    },
    dateTime: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonTextS: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonTextL: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    enterRow: {
        marginTop: 25,
    },

    buttonWhite: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#134fcc',
    },
    blueText: {
        color: '#134fcc',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

});

export default ActivityDetails;