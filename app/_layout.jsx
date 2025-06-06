import { Stack } from 'expo-router/stack';
import { View } from 'react-native';
import Bottomsheet from './components/bottom-sheet';
import { BottomSheetFooter } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTransparent: true,
            headerTintColor: '#1F2635',
            headerTitleStyle: {
                fontWeight: '500',
            },
            headerTitleAlign: "center"
        }}
        >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}