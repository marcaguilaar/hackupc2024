import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

const ActivityItem = ({ activity }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.activity}>{activity}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#c4e7ff',
        borderRadius: 10,
        marginBottom: 5,
    },
    activity: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ActivityItem;