import React from 'react';
import {Stack} from 'expo-router';

const ProfileStack = () => {
  return (
    <Stack screenOptions={{contentStyle: {backgroundColor: "#ffffff"}, headerShadowVisible: false}}>
      <Stack.Screen name="profile" options={{headerShown: false}} />
      <Stack.Screen
        name="my-profile"
        options={{
          headerTitle: 'My Profile',
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
        name="edit-profile"
        options={{
          headerTitle: 'Profile',
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
    </Stack>
  );
};

export default ProfileStack;
