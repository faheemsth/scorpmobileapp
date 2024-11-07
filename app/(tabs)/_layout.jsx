import {Tabs} from 'expo-router';
import ListTask from '../../assets/icons/listtask.svg';
import LeaveIcon from '../../assets/icons/leaves.svg';
import PofileIcon from '../../assets/icons/profile.svg';
import HomeIcon from '../../assets/icons/home.svg';
import CalendarIcon from '../../assets/icons/calendar.svg';
import {View} from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderCurve: 'circular',
          elevation: 16,
          height: 82,
          overflow: 'hidden',
        },
        tabBarActiveTintColor: '#7647EB',
        tabBarActiveBackgroundColor: '#FFFFFF',
        headerShown: false,
        tabBarInactiveBackgroundColor: '#FFFFFF',
        tabBarInactiveTintColor: '#A0A0A0',
      }}>
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({color}) => (
            <TabBarIcon color={color}>
              <ListTask width={22} height={22} style={{color: color}} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="leaves"
        options={{
          title: 'Leaves',
          tabBarIcon: ({color}) => (
            <TabBarIcon color={color}>
              <LeaveIcon width={22} height={22} style={{color}} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="clock-in-out"
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => (
            <TabBarIcon color={color}>
              <HomeIcon width={22} height={22} style={{color: color}} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: 'Attendance',
          tabBarIcon: ({color}) => (
            <TabBarIcon color={color}>
              <CalendarIcon height={22} style={{color: color}} />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({color}) => (
            <TabBarIcon color={color}>
              <PofileIcon width={22} height={22} style={{color}} />
            </TabBarIcon>
          ),
        }}
      />
    </Tabs>
  );
}

const TabBarIcon = ({color, children}) => {
  return (
    <View
      style={{
        height: 68,
        flexDirection: 'row',
        borderTopWidth: 4,
        borderColor: color == '#7647EB' ? color : 'transparent',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          flex: 1,
          alignItems: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        {children}
      </View>
    </View>
  );
};
