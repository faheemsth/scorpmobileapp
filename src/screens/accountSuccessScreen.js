import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AccountSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../../assets/images/image131.png')} style={styles.backgroundImage} blurRadius={5}>
      <View style={styles.overlay}/>
     
      <View style={styles.container}>
        <View style={styles.centeredImageContainer}>
          <Image source={require('../../assets/images/Group1000007856.png')} style={styles.centeredImage} />
        </View>
        <Text style={{ fontSize: 20, textAlign: 'center', color: 'black' }}>Your account has been successfully added</Text>
        <TouchableOpacity
          style={[styles.btn, { width: "65%" }]}
        // onPress={() => navigation.navigate('bottom_navigation')}
        onPress={() => navigation.navigate('Login')}

        >
          <Text style={{ fontWeight: "700", fontSize: 18, color: "#000" }}>Done</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Adjust the opacity as needed
  },
  centeredImageContainer: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  centeredImage: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  nextButton: {
    backgroundColor: 'white',
    padding: 15,
    marginTop: 30,
    alignItems: 'center',
    borderRadius: 8,
  },
  btn: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignSelf: "center",
    marginTop: 40,
    borderRadius: 30,
    borderWidth: 1,
    padding: 15,
    width: "90%",
    borderColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
});

export default AccountSuccessScreen;
