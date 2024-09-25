import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack' 
import HomeScreen from './src/homeScreen';

import ClockInOutScreen from './src/screens/clockInOut';  
import BottomNavigation from './src/BottomNavigation'; 
import Profile from './src/profile'; 
import LoginScreen from './src/screens/auth/LoginScreen'; 

import store from './src/redux/index'
import { Provider, useSelector } from 'react-redux';
import SplashScreen from './src/screens/splashScreen';
import PreLoginScreen from './src/screens/preloginscreen'; 

import { Text, View } from 'react-native';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { isAuth } = useSelector((State) => State.authReducer)
    return (
        <Provider store={store}>
            <Stack.Navigator initialRouteName='splash'>
                {!isAuth ? <>
                    <Stack.Screen name='splash' component={SplashScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name='PreLogin' component={PreLoginScreen} options={{ headerShown: false }} /> 
                </> : <>
                    <Stack.Screen name="bottom_navigation" component={BottomNavigation} options={{ headerShown: false }} /> 
                    <Stack.Screen name='profile' component={Profile} options={{ headerShown: false }} />  
                    
                    <Stack.Screen name='clockInOut' component={ClockInOutScreen} options={{ headerShown: false }} />
                </>
                }</Stack.Navigator>
        </Provider>
    );
};

export default AppNavigator;
