import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AttendanceStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="view-attendance"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default AttendanceStack