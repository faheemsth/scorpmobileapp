import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const TasksStack = () => {
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='create-task'
                options={{
                    headerTitle: "Create Task",
                    headerTransparent: false,
                }}
                />
        </Stack>
    )
}

export default TasksStack