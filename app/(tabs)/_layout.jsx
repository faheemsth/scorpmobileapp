import {Tabs} from 'expo-router';
import Dashboard from '../../assets/icons/dashboard.svg';
import ListTask from '../../assets/icons/listtask.svg';
import LeaveIcon from '../../assets/icons/leaves.svg';
import PofileIcon from '../../assets/icons/profile.svg';
import HomeIcon from '../../assets/icons/home.svg';
import CalendarIcon from '../../assets/icons/calendar.svg';
import {Dimensions, View} from 'react-native';
import {Screen} from 'react-native-screens';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderCurve: 'circular',
          elevation:16,
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
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                flex: 1,
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 5,
                  width: Dimensions.get('window').width / 5,
                  flex: 1,
                  backgroundColor: color == '#7647EB' ? color : '#0000',
                }}
              />

              <ListTask width={22} height={22} style={{color: color}} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="leaves"
        options={{
          title: 'Leaves',
          tabBarIcon: ({color}) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                flex: 1,
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 5,
                  width: Dimensions.get('window').width / 5,
                  flex: 1,
                  backgroundColor: color == '#7647EB' ? color : '#0000',
                }}
              />
              <LeaveIcon width={22} height={22} style={{color}} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="clock-in-out"
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                flex: 1,
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 5,
                  width: Dimensions.get('window').width / 5,
                  flex: 1,
                  backgroundColor: color == '#7647EB' ? color : '#0000',
                }}
              />
              <HomeIcon width={22} height={22} style={{color: color}} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: 'Attendance',
          tabBarIcon: ({color}) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                flex: 1,
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 5,
                  width: Dimensions.get('window').width / 5,
                  flex: 1,
                  backgroundColor: color == '#7647EB' ? color : '#0000',
                }}
              />
              <CalendarIcon height={22} style={{color: color}} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({color}) => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                flex: 1,
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 5,
                  width: Dimensions.get('window').width / 5,
                  flex: 1,
                  backgroundColor: color == '#7647EB' ? color : '#0000',
                }}
              />

              <PofileIcon width={22} height={22} style={{color}} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
