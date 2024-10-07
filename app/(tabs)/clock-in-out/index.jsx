import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import Clock from '../../../assets/icons/clock.svg';
import Clockin from '../../../assets/icons/clockin.svg';
import Clockout from '../../../assets/icons/clockout.svg';
import Clockmarked from '../../../assets/icons/clockmarked.svg';

import {LinearGradient} from 'expo-linear-gradient';
import datalayer from '../../../datalayer/datalayer';
import {router, useFocusEffect} from 'expo-router';
import WriteEarlyCheckoutReason from './write-early-check-out-reason';
import Btn from '../../components/btn';

const ClockInOut = () => {
  const [requestEarlyCheckoutReason, setRequestEarlyCheckoutReason] =
    useState(false);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockinTime, setClockinTime] = useState();
  const [clockOutTime, setClockOutTime] = useState();
  const [totalHours, setTotalHours] = useState();
  const [time, setTime] = useState(new Date());
  const [btnColor, setBtnColor] = useState('#167BC4');
  const [user, setUser] = useState();

  const updateDataFromDatalayer = async () => {
    const cis = await datalayer.attendanceLayer.clockInStatus();
    const u = await datalayer.authLayer.getUserAsync();
    if (!!!u) router.replace('/onboarding/hello');

    const cit = await datalayer.attendanceLayer
      .getClockinTimeAsync()
      .catch(console.error);
    const cot = await datalayer.attendanceLayer
      .getClockoutTimeAsync()
      .catch(console.error);

    setClockinTime(cit);
    setClockOutTime(cot);
    setTotalHours(cot - cit);

    setIsClockedIn(cis);
    setUser(u);
  };

  useEffect(() => {
    const initializeClockinStateFromStorage = async () => {
      setInterval(() => {
        setTime(new Date());
      }, 1000);
    };
    updateDataFromDatalayer().catch(console.error);
    initializeClockinStateFromStorage().catch(console.error);
  }, []);

  useEffect(() => {
    const updateClockinUI = async () => {
      setBtnColor(isClockedIn ? '#D5213C' : '#167BC4');
    };
    updateClockinUI().catch(console.error);
    updateDataFromDatalayer().catch(console.error);
  }, [isClockedIn]);

  handleProfileClick = () => {
    console.log('profile clicked');
  };
  handleCheckInOutClick = () => {
    const updateClockin = async () => {
      if (!!isClockedIn) {
        const hasCompletedHours =
          (await datalayer.attendanceLayer.hasCompletedHours(9)) == true;
        console.log('hasCompletedHours', hasCompletedHours);
        if (!hasCompletedHours) {
          // show bottom-sheet and request reason
          setRequestEarlyCheckoutReason(true);
          return;
        }
        newValue = !(
          await datalayer.attendanceLayer.clockOut().catch(console.error)
        )['success'];
      } else {
        newValue = (
          await datalayer.attendanceLayer.clockIn().catch(console.error)
        )['success'];
      }
      setIsClockedIn(newValue);
    };
    updateClockin().catch(console.error);
  };

  const handleViewAttendanceClicked = () => {
    console.log('handleViewAttendanceClicked');
    router.navigate('../../attendance/view-attendance');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container} >
        <View style={styles.headerBg}>
          <View style={styles.header}>
            <TouchableOpacity activeOpacity={0.8} oncPress={handleProfileClick}>
              <View>
                <Image
                  blurRadius={5}
                  fadeDuration={1000}
                  source={{
                    height: 80,
                    width: 80,
                    uri: user?.['avatar'],
                  }}
                  style={{
                    borderRadius: 400,
                    borderColor: 'white',
                    borderWidth: 2,
                    marginTop: 12,
                  }}
                />
              </View>
            </TouchableOpacity>
            <View>
              <Text style={styles.textB}>{user?.['name']}</Text>
              <Text style={styles.textC}>Mark Your Attendance!</Text>
            </View>
          </View>
        </View>
        <View style={styles.indexCard}>
          <Text style={{marginTop: 59, fontWeight: 600, fontSize: 32}}>
            {time.toTimeString().substring(0, 5)}
          </Text>
          <Text style={{color: '#6C6C6C'}}>{time.toDateString()}</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 1)', 'rgba(163, 192, 221, 1)']}
              style={{
                position: 'absolute',
                width: 135,
                height: 135,
                borderRadius: 75,
                opacity: 1.5,
                bottom: -10,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleCheckInOutClick}>
              <LinearGradient
                colors={['#6C6C6C', btnColor]}
                style={{
                  width: 125,
                  height: 125,
                  borderRadius: 63,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Clock width={42} height={42} style={{marginTop: 19}} />

                <Text style={{color: 'white', fontWeight: '500', marginTop: 5}}>
                  CLOCK-{`${isClockedIn ? 'OUT' : 'IN'}`}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'rgba(0, 0, 0, 0.25)',
              borderStyle: 'dashed',
              width: 261,
              alignSelf: 'center',
              marginTop: 39,
            }}
          />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                alignItems: 'center',
                marginHorizontal: 12,
                marginVertical: 19,
              }}>
              <Clockin width={26} height={22} />

              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 3,
                  color: 'rgba(108, 108, 108, 1)',
                }}>
                {clockinTime?.getHours() ?? '00'}:
                {clockinTime?.getMinutes() ?? '00'}
                {'\n'}Clock in
              </Text>
            </View>

            <View style={{alignItems: 'center', marginHorizontal: 12}}>
              <Clockout width={30} height={24} />
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 3,
                  color: 'rgba(108, 108, 108, 1)',
                }}>
                {clockOutTime?.getHours() ?? '00'}:
                {clockOutTime?.getMinutes() ?? '00'}
                {'\n'}Clock out
              </Text>
            </View>

            <View style={{alignItems: 'center', marginHorizontal: 12}}>
              <Clockmarked width={27} height={24} />
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 4,
                  color: 'rgba(108, 108, 108, 1)',
                }}>
                {totalHours?.getHours ?? '00'}:{totalHours?.getMinutes ?? '00'}
                {'\n'}Total hrs
              </Text>
            </View>
          </View>
        </View>

        <Btn
          handleClick={handleViewAttendanceClicked}
          style={{
            width: 328,
            alignSelf: 'center',
            marginVertical: 20,
            borderRadius: 10,
          }}
          title={'View Your Attendance'}
          gradientColors={['#167BC4', '#6E7072']}
        />
      </ScrollView>
      {requestEarlyCheckoutReason && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            height: '100%',
            backgroundColor: '#0002',
            zIndex: 1,
          }}>
          <WriteEarlyCheckoutReason
            onClose={() => setRequestEarlyCheckoutReason(false)}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  header: {
    width: 328,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 8,
  },
  headerBg: {
    backgroundColor: 'rgba(22, 123, 196, 1)',
    width: '100%',
    height: 227,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  indexCard: {
    marginTop: -86,

    backgroundColor: 'white',
    width: 328,
    alignItems: 'center',

    display: 'flex',
    alignSelf: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  linearDeadient: [
    {
      width: 328,
      padding: 15,
      borderRadius: 10,
      alignSelf: 'center',
      marginVertical: 20,
    },
  ],
  textA: {
    color: 'white',
    alignSelf: 'center',
  },
  textB: {
    color: 'white',
    marginTop: 28,
    fontWeight: '600',
  },
  textC: {
    color: 'white',
    marginTop: 7,
    fontWeight: '400',
  },
});

export default ClockInOut;
