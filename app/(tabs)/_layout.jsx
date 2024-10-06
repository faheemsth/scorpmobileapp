import {Tabs} from 'expo-router';
import Dashboard from '../../assets/icons/dashboard.svg';
import ListTask from '../../assets/icons/listtask.svg';
import LeaveIcon from '../../assets/icons/leaves.svg';
import PofileIcon from '../../assets/icons/profile.svg';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderCurve: 'circular',
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          overflow: 'hidden',
        },
        tabBarActiveTintColor: '#FDC933',
        tabBarActiveBackgroundColor: '#167BC4',
        headerShown: false,
        tabBarInactiveBackgroundColor: '#167BC4',
        tabBarInactiveTintColor: 'white',
      }}>
      <Tabs.Screen
        name="clock-in-out"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({color}) => (
            <Dashboard width={22} height={22} style={{color: color}} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({color}) => (
            <ListTask width={22} height={22} style={{color: color}} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaves"
        options={{
          title: 'Leaves',
          tabBarIcon: ({color}) => (
            <LeaveIcon width={22} height={22} style={{color}} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({color}) => (
            <PofileIcon width={22} height={22} style={{color}} />
          ),
        }}
      />
    </Tabs>
  );
}
