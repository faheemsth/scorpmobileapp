import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import Svg, { G, Circle, Path, Defs, Filter, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, setUser } from './../redux/slices/authSlice';
import { storeToken, GetToken } from './../utils/StorageToken';
import LinearGradient from 'react-native-linear-gradient'; // Correct import

const { width, height } = Dimensions.get('window');


const ClockOutScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleClockOut = async () => {
    setLoading(true);
    try {
      const token = await GetToken('token');
      const response = await axios.post(
        'https://api.scorp.co/api/clockout',
        {}, // Empty body for clock-out request
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Success', 'You have successfully clocked out!');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      const token = await GetToken('token');
      console.log('Token:', token);
      console.error('Error:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Unable to clock out. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
  const [profileImage, setProfileImage] = useState(user?.avatar ? { uri: user.avatar } : null);

  const logout = () => {
    dispatch(setAuth(false));
    dispatch(setUser(null));
    storeToken(null);
  };

  const formatDate = (date) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString('en-GB', options);
  };

  const navigateToUserProfile = () => {
    navigation.navigate('UserProfileView', { user });
  };

  const now = new Date();


  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://getadblock.com/update/latest/ab-logo.png' }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.attendanceText}>Mark Your Attendance!</Text>
        </View>
      </View>

      {/* Clock-in Section */}
      <View style={styles.clockInContainer}>
        <Text style={styles.timeText}>{formatTime(now)}</Text>
        <Text style={styles.dateText}>{formatDate(now)}</Text>
        <TouchableOpacity style={styles.clockInButton} onPress={handleClockOut} disabled={loading}>
          <Text style={styles.clockInButtonText}>
            {loading ? 'CLOCKING OUT...' : 'CLOCK OUT'}
          </Text>
          
        </TouchableOpacity>
      </View>

      {/* Bottom Section */}
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text style={styles.footerItemText}>09:15</Text>
          <Text style={styles.footerItemLabel}>Clock in</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={styles.footerItemText}>06:15</Text>
          <Text style={styles.footerItemLabel}>Clock out</Text>
        </View>
        <View style={styles.footerItem}>
          <Text style={styles.footerItemText}>00:00</Text>
          <Text style={styles.footerItemLabel}>Total hrs</Text>
        </View>
      </View>

      {/* View Attendance Button */}
      <TouchableOpacity style={styles.viewAttendanceButton}>
        <Text style={styles.viewAttendanceButtonText}>View Your Attendance s</Text>
      </TouchableOpacity>
    </View>
  );
};

// Style definitions
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#1E88E5',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  attendanceText: {
    fontSize: 16,
    color: '#fff',
  },
  clockInContainer: {
    backgroundColor: '#fff',
    marginTop: -30,
    width: width * 0.9,
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 5,
  },
  timeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  dateText: {
    fontSize: 16,
    color: '#757575',
    marginVertical: 10,
  },
  clockInButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 10,
  },
  clockInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: width * 0.9,
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 5,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerItemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerItemLabel: {
    fontSize: 14,
    color: '#757575',
  },
  viewAttendanceButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  viewAttendanceButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ClockOutScreen;
