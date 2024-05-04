import React from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";

const SignUpModal = ({ visible, onClose }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.popupContainer}>
                    <Text style={styles.message}>You have successfully signed up!</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    popupContainer: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#134fcc",
        alignItems: "center",
    },
    message: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: "bold",
        color: "#134fcc",
    },
    closeButton: {
        color: "#134fcc",
        fontWeight: "bold",
    },
});

export default SignUpModal;
