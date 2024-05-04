import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from "react-native";

const SchedulePage = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Define userEvents inside the component
    const userEvents = [
        {
            date: "2024-05-04",
            events: [
                {
                    name: "Event 1",
                    arrivalDate: "2024-05-04 09:00",
                    departureDate: "2024-05-04 17:00",
                },
                {
                    name: "Event 2",
                    arrivalDate: "2024-05-04 11:00",
                    departureDate: "2024-05-04 14:00",
                },
            ],
        },
        {
            date: "2024-05-05",
            events: [
                {
                    name: "Event 3",
                    arrivalDate: "2024-05-05 10:00",
                    departureDate: "2024-05-05 12:00",
                },
            ],
        },
    ];

    const openEventDetails = (event) => {
        setSelectedEvent(event);
    };

    const closeEventDetails = () => {
        setSelectedEvent(null);
    };

    const renderEvent = ({ item }) => (
        <TouchableOpacity style={styles.eventContainer} onPress={() => openEventDetails(item)}>
            <Text style={styles.eventName}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderDay = ({ item }) => (
        <View style={styles.dayContainer}>
            <Text style={styles.date}>{item.date}</Text>
            <FlatList
                data={item.events}
                keyExtractor={(event, index) => index.toString()}
                renderItem={renderEvent}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={userEvents}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderDay}
            />
            {selectedEvent && (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={!!selectedEvent}
                    onRequestClose={closeEventDetails}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedEvent.name}</Text>
                            <Text>Arrival: {selectedEvent.arrivalDate}</Text>
                            <Text>Departure: {selectedEvent.departureDate}</Text>
                            <TouchableOpacity onPress={closeEventDetails} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    // Styles remain unchanged
});

export default SchedulePage;
