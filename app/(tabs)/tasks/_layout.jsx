import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const TasksStack = () => {
    return (
        <Stack screenOptions={{headerShadowVisible: false}}>

            <Stack.Screen
                name='index'
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='create-task'
                options={{
                    headerTitle: "Create New Task",
                    headerTransparent: true,
                    headerTitleStyle: {color: "#7647EB"},
                    headerTitleAlign: 'center',
                }}
                />
        </Stack>
    )
}

export default TasksStack