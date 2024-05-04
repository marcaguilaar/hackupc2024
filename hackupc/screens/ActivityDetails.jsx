import React, {useState} from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


//Components
import Header from "../navigation/HeaderBack";
import HeroImage from "../components/heroImage";

//PopUps
import SignUpModal from "../popUps/signUpModal";

const ActivityDetails = ({ activity }) => {
    const navigation = useNavigation();
    const [isPopupVisible, setPopupVisible] = useState(false);

    const handleSignUp = () => {
        setPopupVisible(true);
        setTimeout(() => {
            navigation.goBack();
            setPopupVisible(false);
        }, 1400); // Close popup after 1 second
    };


    return (
        <SafeAreaView style={styles.outercontainer}>
            <Header />
            <View style={styles.innerContainer}>
                <HeroImage image={"https://studentaffairs.unl.edu/images/news-article/Football_0.jpg"} />
                <Text style={styles.title}>Title</Text>
                <ScrollView style={styles.descriptionRow}>
                    <Text style={styles.description}>Experience the thrill of live football! Gather friends and head to a bustling stadium or a cozy sports bar to watch your favorite team play. The energy of the crowd, the roar after a goal, and the shared excitement create unforgettable moments. Grab some snacks, wear your team colors, and immerse yourself in the passionate atmosphere. It's the perfect way to enjoy camaraderie, cheer on your heroes, and create lasting memories. Whether it's a local league or a major tournament, watching football live is an electrifying experience that's perfect for sports enthusiasts and casual fans alike.</Text>
                </ScrollView>
                <TouchableOpacity style={styles.linkedText}>
                    <Ionicons name="location" size={24} color="#012e99" />
                    <Text style={styles.locationText}>Location</Text>
                </TouchableOpacity>
                <View style={styles.row}>
                    <Text style={styles.dateTime}>Date Time</Text>
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
        fontSize: 20,
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