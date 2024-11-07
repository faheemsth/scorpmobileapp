import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ClockInOutScreen = () => {
  return (
    <Stack screenOptions={{headerShadowVisible: false}}>

      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ClockInOutScreen;
