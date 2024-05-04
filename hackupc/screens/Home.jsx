import React from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";

//Components
import Header from "../navigation/Header";
import CityCapsule from "../components/cityCapsule";


const travelData = [
    {
        id: '1',
        city: 'Paris',
        dates: 'Jan 10 - Jan 20',
        image: 'https://t4.ftcdn.net/jpg/02/96/15/35/360_F_296153501_B34baBHDkFXbl5RmzxpiOumF4LHGCvAE.jpg',
        reason: 'Business Conference',
        activities: ['Eiffel Tower visit', 'Wine tasting', 'City tour'],
    },
    {
        id: '2',
        city: 'New York',
        dates: 'Feb 15 - Feb 25',
        image: 'https://images.unsplash.com/photo-1555109307-f7d9da25c244?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D',
        reason: 'Tech Expo',
        activities: ['Central Park walk', 'Broadway show', 'Museum visit'],
    },
    {
        id: '3',
        city: 'Tokyo',
        dates: 'Mar 5 - Mar 15',
        image: 'https://t3.ftcdn.net/jpg/04/98/23/10/360_F_498231018_6w6Zt0h2PdU4Muy5Tvph2VeNG67yTuwl.jpg',
        reason: 'Networking Summit',
        activities: ['Sushi making class', 'Temple visit', 'Technology tour'],
    },
    {
        id: '4',
        city: 'London',
        dates: 'Apr 10 - Apr 20',
        image: 'https://t4.ftcdn.net/jpg/02/57/75/51/360_F_257755130_JgTlcqTFxabsIKgIYLAhOFEFYmNgwyJ6.jpg',
        reason: 'Leadership Retreat',
        activities: ['Thames cruise', 'Museum tour', 'West End show'],
    },
    {
        id: '5',
        city: 'Sydney',
        dates: 'May 1 - May 10',
        image: 'https://images.unsplash.com/photo-1527048272542-01226422db13?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2lkbmV5fGVufDB8fDB8fHww',
        reason: 'Corporate Seminar',
        activities: ['Harbour Bridge climb', 'Beach day', 'Opera House tour'],
    },
];


const ItemSeparator = () => <View style={styles.separator} />;


export default function Home({ navigation }) {
    return (
        <SafeAreaView style={styles.outercontainer}>
            <Header />
            <View style={styles.innerContainer}>
                <Text style={styles.myTravel}>My Trips</Text>
                <FlatList
                    data={travelData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('TravelPlan', {
                                    city: item.city,
                                    reason: item.reason,
                                    activities: item.activities,
                                    dates: item.dates,
                                })
                            }
                        >
                            <CityCapsule city={item.city} dates={item.dates} image={item.image} />
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