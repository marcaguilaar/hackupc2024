import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, LogBox } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('CheckUser')}>
                    <Image source={require('../assets/travelperkIcon.jpeg')} style={styles.logo} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: -10,
        maxHeight: 150,
        backgroundColor: "#012e99",
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    logo: {
        width: 200,
        height: 50,
    },
});

export default Header;
