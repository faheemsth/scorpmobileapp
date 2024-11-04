import {router} from 'expo-router';
import {useEffect} from 'react';
import {Alert, StyleSheet, Text} from 'react-native';
import datalayer from '../datalayer/datalayer';
import {useFonts} from 'expo-font';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [loaded, error] = useFonts({
    'poppins-100': require('../assets/fonts/poppins-100.otf'),
    'poppins-200': require('../assets/fonts/poppins-200.otf'),
    'poppins-300': require('../assets/fonts/poppins-300.otf'),
    'poppins-400': require('../assets/fonts/poppins-400.otf'),
    'poppins-500': require('../assets/fonts/poppins-500.otf'),
    'poppins-600': require('../assets/fonts/poppins-600.otf'),
    'poppins-700': require('../assets/fonts/poppins-700.otf'),
    'poppins-800': require('../assets/fonts/poppins-800.otf'),
    'poppins-900': require('../assets/fonts/poppins-900.otf'),

    'outfit-100': require('../assets/fonts/outfit-100.otf'),
    'outfit-200': require('../assets/fonts/outfit-200.otf'),
    'outfit-300': require('../assets/fonts/outfit-300.otf'),
    'outfit-400': require('../assets/fonts/outfit-400.otf'),
    'outfit-500': require('../assets/fonts/outfit-500.otf'),
    'outfit-600': require('../assets/fonts/outfit-600.otf'),
    'outfit-700': require('../assets/fonts/outfit-700.otf'),
    'outfit-800': require('../assets/fonts/outfit-800.otf'),
    'outfit-900': require('../assets/fonts/outfit-900.otf'),
  });
  useEffect(() => {
    const authCheck = async () => {
      const token = await datalayer.getData(datalayer.KEYS.token);
      console.log('index ', token);
      if (!!token) {
        // token exists
        router.replace('/clock-in-out');
      } else {
        router.replace('./onboarding/hello');
      }
    };
    if (loaded) {
      authCheck().catch(e => Alert.alert('Error', e?.['message']));
    }
  }, [loaded]);
  return (
    <>
      <Text>Loading Fonts</Text>
      <StatusBar style='dark' />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
