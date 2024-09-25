import React, {useState} from 'react';
import {
  View,
  Text, 
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomComponent from '../../components/customComponent';
import {RadioButton} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {setAuth, setUser, signInAsync} from '../../redux/slices/authSlice';
import {post} from '../../utils/axios';
import {storeToken} from '../../utils/StorageToken';
import LinearGradient from 'react-native-linear-gradient';
const LoginScreen = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const initialValues = {
    email: 'azmatchohan01@gmail.com',
    password: '123456789',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSignIn = async values => {
    try {
      const payload = {
        email: values.email.trim(),
        password: values.password,
      };

      const response = await post('/login', payload);

      console.log('Server response:', response.data);
      if (response.data.status) {
        storeToken(response.data.data.token);
        dispatch(setUser(response.data.data.user));
        dispatch(setAuth(true));
        navigation.navigate('bottom_navigation');
      }

      // if (response.data && response.data.success) {
      //   console.log('Authentication data:', response.data.data);

      //   dispatch(signInAsync(response.data.data));

      //   navigation.navigate('bottom_navigation');
      // } else {
      //   console.error('Sign-in failed', response.data && response.data.message);
      // }
    } catch (error) {
      console.error(
        'Sign-in failed',
        error.status,
        error.response?.data.message,
      );
    }
  };

  const handleSignUpPress = () => {
    navigation.navigate('createAccount');
  };

  return (
     
    <ScrollView contentContainerStyle={styles.container}>
    <LinearGradient colors={['#D4E5F2', '#167BC4']} style={styles.background}
     start={{ x: 0.5, y: 0 }}
     end={{ x: 0.5, y: 1 }}
     >
      <Image 
        source={require('../../../assets/images/welcome_icon.png')}  // Replace with your actual logo path
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>CONVOSOFT PEOPLE PORTAL</Text>

      <LinearGradient
      colors={['#D4E5F2','#D4E5F2','#D4E5F2', '#167BC4']} // Gradient colors
      style={styles.background2}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.1, y: 1 }}
    >
      <View style={styles.formContainer}>

      {/* Formik Form */}
      <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignIn}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            {/* Email Field */}
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            {/* Password Field */}
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSubmit}>
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      </View>
      </LinearGradient>
    </LinearGradient>
  </ScrollView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

  background2: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 30,  // Border radius for top-left corner
    borderTopRightRadius: 30, // Border radius for top-right corner
    overflow: 'hidden', // Ensure children don't overflow the radius
  },
  formContainer: { 
    padding: 20,   // Padding inside the form container 
    paddingBottom:100,
     
  },
  container: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    textAlign: 'left',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  checkboxContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 16,
  },
  forgotPasswordLink: {
    color: '#3498db',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 8,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center',
  },
});

export default LoginScreen;
