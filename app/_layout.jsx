import { Stack } from 'expo-router/stack';
import { View } from 'react-native';
import Bottomsheet from './components/bottom-sheet';
import { BottomSheetFooter } from '@gorhom/bottom-sheet';

export default function Layout() {
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: '#EFF3F7',
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