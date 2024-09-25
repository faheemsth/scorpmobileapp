import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Svg, { Path } from 'react-native-svg';

const UserProfileScreen = ({ navigation }) => {
    const { user } = useSelector((state) => state.authReducer);
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');
    const [phoneNumber, setPhoneNumber] = useState(user.phone || '');
    const [profileImage, setProfileImage] = useState(user.avatar ? { uri: user.avatar } : null);

    const navigateToEditProfile = () => {
        navigation.navigate('VerifyIdentityScreen');
    };

    const handleImageUpload = () => {
        console.log('Upload image from device');
    };

    const handleSave = () => {
        console.log('Save button pressed');
        // Implement save functionality here
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                <TouchableOpacity style={{ padding: 20 }} onPress={() => navigation.goBack()}>
                    <Svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M6.41475 15.6834L0.202776 8.59103C0.129044 8.5066 0.0766934 8.41513 0.0457257 8.31662C0.014758 8.21812 -0.00048003 8.11258 1.15207e-05 8C1.15207e-05 7.88742 0.0154954 7.78188 0.0464631 7.68338C0.0774308 7.58487 0.129535 7.4934 0.202776 7.40897L6.41475 0.295514C6.58679 0.0985048 6.80185 0 7.05991 0C7.31797 0 7.53917 0.105541 7.7235 0.316623C7.90783 0.527704 8 0.773967 8 1.05541C8 1.33685 7.90783 1.58311 7.7235 1.7942L2.30416 8L7.7235 14.2058C7.89555 14.4028 7.98157 14.6457 7.98157 14.9345C7.98157 15.2232 7.8894 15.4729 7.70507 15.6834C7.52074 15.8945 7.30569 16 7.05991 16C6.81413 16 6.59908 15.8945 6.41475 15.6834Z" fill="black" />
                    </Svg>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleImageUpload} style={styles.profileImageContainer}>
                {profileImage ? (
                    <Image source={profileImage} style={styles.profileImage} />
                ) : (
                    <View style={[styles.profileImage, styles.profileImagePlaceholder]}>
                        <Text>Add Photo</Text>
                    </View>
                )}
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Enter Your Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter Your Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Enter Your Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F2F6FB',
        justifyContent: 'center', // Center content vertically when space permits
    },
    profileImageContainer: {
        alignSelf: 'center',
        marginVertical: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileImagePlaceholder: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#2C2E43',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
        width: '100%',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    editDetailsBtn: {
        backgroundColor: '#FCFCFC',
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 50,
        alignSelf: 'center',
        marginTop: 20,
    },
    btnText: {
        fontWeight: '400',
        fontSize: 18,
        color: '#000',
    },
});

export default UserProfileScreen;
