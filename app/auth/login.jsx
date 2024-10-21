import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Email from '../../assets/icons/email.svg';
import Lock from '../../assets/icons/lock.svg';
import Eye from '../../assets/icons/eye.svg';
import Btn from '../components/btn';
import datalayer from '../../datalayer/datalayer';
import { router, useNavigation } from 'expo-router';
import InputField from '../components/input-field';

import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Login = () => {
  const [hidePass, setHidePass] = useState(true);
  const [email, setEmail] = useState('');
  const [pswd, setPswd] = useState('');
  const navigation = useNavigation();

  const [imgTouchCount, setImageTouchCount] = useState(0);
  const [showMasterLogin, setShowMasterLogin] = useState(false);

  useEffect(() => {
    if (!!!showMasterLogin) setShowMasterLogin(imgTouchCount > 4);
    setTimeout(() => {
      setImageTouchCount(0);
    }, 5000);
  }, [imgTouchCount]);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    datalayer.authLayer.allowEmailPassLogin().then(bool => { setShowMasterLogin(true); setImageTouchCount(5) }).catch(console.error)
  }, []);

  handlePassEyeClick = () => {
    setHidePass(prev => !prev);
  };

  handleImagePressed = () => {
    setImageTouchCount(val => ++val);
  };

  handleLoginClick = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const webClientId =
        '1055777588098-74j3eta2a1lkdogvpipgggrd2g9lkgin.apps.googleusercontent.com';
      console.log('configuring with', webClientId);
      GoogleSignin.configure({
        webClientId: webClientId,
        offlineAccess: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      const res = await datalayer.authLayer.postGoogleLoginReq(
        userInfo?.data?.user?.email,
      );
      router.replace('../clock-in-out');
    } catch (error) {
      let msg = '';
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        msg = 'User cancelled the login flow';
      } else if (error.code === statusCodes.IN_PROGRESS) {
        msg = 'Sign in is in progress';
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        msg = 'Play services not available';
      } else {
        if (isErrorWithCode(error)) {
          msg = 'an error with code:' + JSON.stringify(error);
        } else {
          msg = 'Some other error' + JSON.stringify(error?.['message'] ?? error);
        }
      }
      console.error("Error", msg);
      Alert.alert('Error', msg);
    }
  };

  handleMasterLoginClick = async () => {
    try {
      const res = await datalayer.authLayer.login(email, pswd);
      router.replace('../clock-in-out');
    } catch (e) {
      Alert.alert('Error', e?.['message']);
    }
  };

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.scrollable}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.headingText}>Convosoft People Portal</Text>
          <Pressable onPress={handleImagePressed}>
            <Image source={require('../../assets/welcome_icon.png')} />
          </Pressable>
          <View
            style={styles.loginView}>
            <Btn
              title={'Google Login'}
              style={{ marginHorizontal: 10 }}
              handleClick={handleLoginClick}
            />
            {!!showMasterLogin ? (
              <>
                <InputField
                  leading={<Email width={20} height={20} />}
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={setEmail}
                />
                <InputField
                  leading={<Lock width={20} height={20} />}
                  secureTextEntry={hidePass}
                  placeholder="Enter Your Password"
                  value={pswd}
                  onChange={setPswd}
                  trailing={
                    <>
                      <Pressable onPress={handlePassEyeClick}>
                        <Eye width={20} height={20} />
                      </Pressable>
                    </>
                  }
                />

                <Btn
                  title={'Login'}
                  style={{ marginHorizontal: 10 }}
                  handleClick={handleMasterLoginClick}
                />
              </>
            ) : null}
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  headingText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7647EB',
  },
  scrollable: { flexGrow: 1, display: 'flex' },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  loginView: {
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 35,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    gap: 20,
  },
  iconedTextField: {
    inputField: {
      paddingHorizontal: 8,
      flexGrow: 1,
    },
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#7647EB',
    marginHorizontal: 10,
  },
});

export default Login;
