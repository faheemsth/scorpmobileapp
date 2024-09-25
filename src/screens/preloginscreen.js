import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions,ScrollView  } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');
const LoginScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      // handleGetStarted();
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

 
  return (
    <LinearGradient
    colors={['#EDF5FC', '#007AFF']} // Static gradient colors
    style={styles.gradientBackground}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
    >
        <ScrollView>
            <View style={styles.container}>
               
                {/* Heading */}
                <Text style={styles.heading}>Hello! </Text>
                
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Image 
                    source={require('../../assets/images/welcome_icon.png')} // Add your logo image path here
                    style={styles.logo}
                    resizeMode="contain"
                    />
                </View>

                {/* Description Text */}
                <Text style={styles.description}>
                    This application is used for employee attendance management system. It also increases benefits in your work.
                </Text>

                {/* Login Button */}
                <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                    <Text style={styles.buttonText}>Login to your account</Text>
                </TouchableOpacity>
                
            </View>
        </ScrollView>
        </LinearGradient>
     
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    gradientBackground: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    heading: {
      fontSize: width * 0.08, // Makes the heading responsive
      color: '#333',
      fontWeight: 'bold',
      marginBottom: 20,
    },
    logoContainer: {
      width: width * 0.6, // Responsive width
      height: height * 0.3, // Responsive height
      marginBottom: 20,
    },
    logo: {
      width: '100%',
      height: '100%',
    },
    description: {
      fontSize: width * 0.045, // Responsive text size
      color: '#fff',
      textAlign: 'center',
      marginBottom: 30,
      width:width * 0.8, 
    },
    button: {
      backgroundColor: '#007AFF',
      paddingVertical: height * 0.02, // Responsive padding
      paddingHorizontal: width * 0.15, // Responsive padding
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 3,
    },
    buttonText: {
      color: '#fff',
      fontSize: width * 0.045, // Responsive text size
      fontWeight: '600',
      textAlign: 'center',
    },
});

export default LoginScreen;
