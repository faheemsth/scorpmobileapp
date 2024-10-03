import { Tabs } from 'expo-router';
import Dashboard from "../../assets/icons/dashboard.svg";
import ListTask from "../../assets/icons/listtask.svg"

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarStyle: { borderCurve: "circular" },
            tabBarActiveTintColor: 'yellow',
            tabBarActiveBackgroundColor: "#167BC4",
            headerShown: false,
            tabBarInactiveBackgroundColor: "#167BC4",
            tabBarInactiveTintColor: 'white'
        }}>
            <Tabs.Screen
                name="clock-in-out"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color }) => <Dashboard width={22} height={22} fill="#f00" style={{ color: "#f00" }} />,
                }}
            />
            <Tabs.Screen
                name="tasks"
                options={{
                    title: "Tasks",
                    tabBarIcon: ({ color }) => <ListTask width={22} height={22} />
                }}
            />
        </Tabs>
    );
}
