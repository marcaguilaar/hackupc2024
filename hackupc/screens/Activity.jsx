import React from "react";
import { View, SafeAreaView, Text, FlatList, StyleSheet } from "react-native";

const Activity = ({ route }) => {
    const { city, reason, activities } = route.params;

    return (
        <SafeAreaView style={styles.outercontainer}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>{city}</Text>
                <Text style={styles.subtitle}>Reason: {reason}</Text>
                <Text style={styles.sectionTitle}>Team Building Activities</Text>
                <FlatList
                    data={activities}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <Text style={styles.activity}>{item}</Text>}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                />
            </View>
        </SafeAreaView>
    );
}
