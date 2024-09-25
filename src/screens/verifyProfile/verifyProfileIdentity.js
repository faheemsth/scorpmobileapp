import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { useSelector } from 'react-redux';

const VerifyIdentityScreen = ({ navigation }) => {
    const { user } = useSelector((state) => state.authReducer);

    const navigateToPhoneNumberVerification = () => {
        navigation.navigate('PhoneNumberVerificationScreen');
    };

    const navigateToEmailVerification = () => {
        navigation.navigate('EmailVerificationScreen');
    };
    const navigateToNextScreen = () => {
        navigation.navigate('editProfileDetails', { user });
    };
    return (
        <ImageBackground
            source={require('../../../asssets/profileBack.png')}
            style={styles.backgroundImage}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity style={{ padding: 20, marginTop: 10, marginLeft: 10 }} onPress={() => navigation.goBack()}>
                    <Svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M6.41475 15.6834L0.202776 8.59103C0.129044 8.5066 0.0766934 8.41513 0.0457257 8.31662C0.014758 8.21812 -0.00048003 8.11258 1.15207e-05 8C1.15207e-05 7.88742 0.0154954 7.78188 0.0464631 7.68338C0.0774308 7.58487 0.129535 7.4934 0.202776 7.40897L6.41475 0.295514C6.58679 0.0985048 6.80185 0 7.05991 0C7.31797 0 7.53917 0.105541 7.7235 0.316623C7.90783 0.527704 8 0.773967 8 1.05541C8 1.33685 7.90783 1.58311 7.7235 1.7942L2.30416 8L7.7235 14.2058C7.89555 14.4028 7.98157 14.6457 7.98157 14.9345C7.98157 15.2232 7.8894 15.4729 7.70507 15.6834C7.52074 15.8945 7.30569 16 7.05991 16C6.81413 16 6.59908 15.8945 6.41475 15.6834Z" fill="black" />
                    </Svg>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: "600", color: "#000", paddingTop: 20, marginLeft: -30 }}>Verify Your Identity</Text>
                <Text></Text>


            </View>
            <View style={styles.container}>
                <Text style={styles.subheading}>Choose a method to identify yourself</Text>
                <TouchableOpacity style={styles.btn} onPress={navigateToPhoneNumberVerification}>
                    <Text style={styles.optionText}>Phone Number</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={navigateToEmailVerification}>
                    <Text style={styles.optionText}>Email</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton} onPress={navigateToNextScreen}>
                    <Text style={styles.nextText}>Next</Text>
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
        marginTop: 100,
        alignItems: 'center',
    },

    subheading: {
        marginTop: 60,
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 20,
        color: '#000000',

    },

    optionText: {
        fontSize: 18,
        color: '#000000',
        fontWeight: '400'
    },

    nextText: {
        fontSize: 18,
        color: '#000000',
        fontWeight: '600'
    },
    nextButton: {
        alignItems: 'center',
        backgroundColor: '#FCFCFC',
        borderRadius: 30,
        borderWidth: 2,
        height: 50,
        marginTop: 100,
        paddingHorizontal: 70,
        justifyContent: 'center',
        borderColor: "#FFFFFF",
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3, // Shadow radius
        elevation: 5, // Elevation for Android
    },

    btn: {
        flexDirection: 'row', // Align icon and text horizontally
        alignItems: 'center', // Center items vertically
        backgroundColor: '#FCFCFC',
        marginTop: 20,
        borderRadius: 30,
        borderWidth: 2,
        height: 50,
        paddingHorizontal: 20,
        width: 290,
        justifyContent: 'center', // Space evenly between icon and text
        borderColor: "#FFFFFF",
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3, // Shadow radius
        elevation: 5, // Elevation for Android
    },

});

export default VerifyIdentityScreen;
