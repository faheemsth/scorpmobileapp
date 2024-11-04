import {View, Text} from 'react-native';
import React from 'react';
import {Stack} from 'expo-router';

const LeavesStack = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen
        name="request-leave"
        options={{
          headerTitle: 'Request Leave',
          headerTransparent: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'poppins-500',
            fontSize: 20,
            color: '#7647EB',
          },
          headerBackTitleVisible: true,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="leave-history"
        options={{headerTitle: 'Leave History', headerTransparent: true}}
      />
    </Stack>
  );
};

export default LeavesStack;
