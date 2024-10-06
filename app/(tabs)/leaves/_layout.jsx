import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const LeavesStack = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown: false}} />
      <Stack.Screen name="request-leave" options={{headerTitle: "Request Leave", headerTransparent: true}} />
    </Stack>
  )
}

export default LeavesStack