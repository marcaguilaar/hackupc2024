import React from "react";
import { View, Image, StyleSheet } from "react-native";

const HeroImage = ({ image }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        borderRadius: 12,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
});

export default HeroImage;