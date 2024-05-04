import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                    <Ionicons name="arrow-back" size={34} color="white" />
                </TouchableOpacity>

                <View style={styles.logoContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image source={require('../assets/travelperkIcon.jpeg')} style={styles.logo} />
                    </TouchableOpacity>
                </View>

                <View style={styles.iconContainer} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: "#012e99",
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
    },
    iconContainer: {
        width: 50,
        alignItems: 'center',
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 50,
    },
});

export default Header;
