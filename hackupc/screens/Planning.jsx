import React, {useEffect, useState} from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";

//Components
import Header from '../navigation/HeaderBack';

const CONTENT = [
    {
        title: "Day 1",
        activities: [
            {
                name: "Activity 1",
                time: "10:00 - 12:00",
                location: "Location 1",
            },
            {
                name: "Activity 2",
                time: "14:00 - 16:00",
                location: "Location 2",
            },
        ],
    },
    {
        title: "Day 2",
        activities: [
            {
                name: "Activity 3",
                time: "09:00 - 11:00",
                location: "Location 3",
            },
            {
                name: "Activity 4",
                time: "13:00 - 15:00",
                location: "Location 4",
            },
        ],
    },
    {
        title: "Day 3",
        activities: [
            {
                name: "Activity 3",
                time: "09:00 - 11:00",
                location: "Location 3",
            },
            {
                name: "Activity 4",
                time: "13:00 - 15:00",
                location: "Location 4",
            },
        ],
    },
    {
        title: "Day 4",
        activities: [
            {
                name: "Activity 3",
                time: "09:00 - 11:00",
                location: "Location 3",
            },
            {
                name: "Activity 4",
                time: "13:00 - 15:00",
                location: "Location 4",
            },
        ],
    },
];



const Planning = () => {
    return (
        <SafeAreaView style={styles.outercontainer}>
            <Header />
            <View style={styles.innerContainer}>
                <Text style={styles.title}>User's Plan</Text>
                <ScrollView>
                    {CONTENT.map((day, index) => (
                        <View key={index}>
                            <Text style={styles.dayTitle}>{day.title}</Text>
                            {day.activities.map((activity, index) => (
                                <TouchableOpacity key={index} style={styles.activityContainer}>
                                    <Text style={styles.activityName}>{activity.name}</Text>
                                    <Text style={styles.activityTime}>{activity.time}</Text>
                                    <Text style={styles.activityLocation}>{activity.location}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </ScrollView>
            </View>
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
    dayTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    activityContainer: {
        padding: 10,
        borderWidth: 2,
        borderColor: '#134fcc',
        borderRadius: 10,
        marginBottom: 10,
    },
    activityName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#134fcc',
    },
});

export default Planning;
