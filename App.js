import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ToastProvider } from 'react-native-toast-notifications';

import AppNavigator from './AppNavigator'; // Verify path
import { GetToken } from './src/utils/StorageToken'; // Verify path
import { Provider } from 'react-redux';
import store from './src/redux'; // Verify path
import { GetUserProfile } from './src/redux/slices/authSlice'; // Verify path

const App = () => {
  useEffect(() => {
    (async () => {
      let token = await GetToken('token');
      console.log("token", token);
      if (token) {
        store.dispatch(GetUserProfile());
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <ToastProvider>
          <AppNavigator />
        </ToastProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
