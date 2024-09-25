import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import CodeInputField from '../../components/codeInputField';
import { useSelector } from 'react-redux';

const PhoneNumberVerificationScreen = ({ navigation }) => {
        // Implement navigation to the next screen
        const { user } = useSelector((state) => state.authReducer);
        console.log('userrrrrrrrrrrr', user);
        const navigateToNextScreen = () => {
            navigation.navigate('editProfileDetails', { user });
        };

    return (
        <ImageBackground
            source={require('../../../asssets/profileBack.png')}
            style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.subheading}>Enter the 6-digit that we have sent via your email to verify your identity</Text>
                <CodeInputField/>
                <TouchableOpacity style={styles.nextBtn} onPress={navigateToNextScreen}>
                    <Text style={styles.nextBtnText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        marginTop: 70,
        alignItems: 'center',
        justifyContent: 'center', // Center items vertically
    },
    subheading: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 20,
        marginTop: 50,
        textAlign: 'center',
        paddingHorizontal: 50,
        lineHeight: 28,
        color:'black'
    },
    nextBtn: {
        backgroundColor: '#FCFCFC',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20, // Adjust as needed
        width: 200,
        alignItems: 'center',
    },
    nextBtnText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
});

export default PhoneNumberVerificationScreen;
