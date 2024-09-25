import React, { useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomComponent from '../components/customComponent';

const SplashScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleGetStarted();
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/image166.png')}
      style={styles.container}
      blurRadius={10}
    >
      <View style={styles.overlay}>
        <Text style={styles.welcomeText}>Welcome To</Text>
        <CustomComponent style={styles.logoContainer}>
          <Text style={styles.logoText}>Leave</Text>
        </CustomComponent>
      </View>
      <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
        <Text style={styles.getStartedButtonText}>Get Started</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',

  },
  overlay: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '500',
    marginVertical: 80,
    lineHeight: 36,
    color:'#000000'
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 150,
    height: 100,
    borderRadius: 8,
    marginBottom: 20,
    // marginTop: 25,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  getStartedButton: {
    marginBottom: 70,
    paddingVertical: 10,
    paddingHorizontal: 70,
    backgroundColor: '#FFF',
    borderRadius: 29,
  },
  getStartedButtonText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 27,
    color: '#000000',
  },
});

export default SplashScreen;
