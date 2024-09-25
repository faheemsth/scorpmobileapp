import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useClearByFocusCell, CodeField } from 'react-native-confirmation-code-field';
import CodeInputField from '../components/codeInputField';

const CELL_COUNT = 6;

const AuthenticationCodeScreen = () => {
  const navigation = useNavigation();
  const codeInputRef = useRef();
  const [value, setValue] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });



  return (
    <ImageBackground source={require('../../assets/images/image124.png')} style={styles.backgroundImage} blurRadius={5}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.title}>Enter authentication code</Text>
        <Text style={styles.subtitle}>Enter the 6-digit code that we have sent via the phone number +34 409-3049-3245</Text>

        <CodeInputField />
{/* 
        <Text style={styles.resendText}>
          Don't have a code? <Text style={styles.resendLink}>Re-send</Text>
        </Text> */}

        <TouchableOpacity
          style={[styles.btn, { width: '65%' }]}
          onPress={() => navigation.navigate('newPassword')}
        >
          <Text style={{ fontWeight: '700', fontSize: 18, color: '#000' }}>Next</Text>
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
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 25,
    color: 'black',
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 20,
    color: 'black',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInputContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  codeInput: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: '700',
  },
  codeInputLine: {
    height: 2,
    backgroundColor: 'black',
    width: '100%',
  },
  focusCell: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  resendText: {
    fontSize: 14,
    color: 'black',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  resendLink: {
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  btn: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignSelf: 'center',
    marginTop: 55,
    borderRadius: 30,
    borderWidth: 1,
    padding: 15,
    width: '90%',
    borderColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 80,
  },
});

export default AuthenticationCodeScreen;
