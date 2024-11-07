import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';


import Clockout from '../../../assets/icons/clockkout.svg';
import Clockmarked from '../../../assets/icons/totalhrs.svg';
import Clockin from   '../../../assets/icons/clockkin.svg';  
import {LinearGradient} from 'expo-linear-gradient';
import datalayer, {
  useClockinStatus,
  useUser,
} from '../../../datalayer/datalayer';
import {router, useFocusEffect} from 'expo-router';
import WriteEarlyCheckoutReason from './write-early-check-out-reason';
import Btn from '../../components/btn';
import BGIcon from '../../../assets/icons/BGIcon.svg';
import UserIcon from '../../../assets/icons/profile.svg';

const ClockInOut = () => {
  const [requestEarlyCheckoutReason, setRequestEarlyCheckoutReason] =
    useState(false);
  const [time, setTime] = useState(new Date());
  const [btnColor, setBtnColor] = useState('');
  const [
    {clockinStatus, clockoutTime, clockinTime, totalHours},
    fetchClockinAsync,
  ] = useClockinStatus();
  const user = useUser();

  const [loading, setLoading] = useState(false);

  const updateDataFromDatalayer = async () => {
    fetchClockinAsync()?.catch(e => Alert.alert(e?.['message']));
  };
  useFocusEffect(
    useCallback(() => {
      updateDataFromDatalayer().catch(e =>
        Alert.alert('Error', e?.['message']),
      );
      console.log(
        'clockin-statuses are',
        clockinStatus,
        clockoutTime,
        clockinTime,
        totalHours,
      );
      setBtnColor(clockinStatus ? '#D5213C' : '#11A120');
      fetchClockinAsync()?.catch(e => Alert.alert('Error', e.message));
    }, [clockinStatus, user]),
  );
  useEffect(() => {
    const runClock = async () => {
      setInterval(() => {
        setTime(new Date());
      }, 1000);
    };
    runClock().catch(e => Alert.alert('Error', e?.['message']));
  }, []);

  useEffect(() => {
    performAsync = async () => {
      console.log('loading', loading);
      if (loading)
        await checkInOut().catch(e => Alert.alert('Error', e?.['message']));
      setLoading(false);
    };
    performAsync().catch(e => Alert.alert('Error', e?.['message']));
  }, [loading]);

  handleProfileClick = () => {
    console.log('profile clicked');
  };
  checkInOut = async () => {
    let newValue = false;
    if (!!clockinStatus) {
      const hasCompletedHours =
        (await datalayer.attendanceLayer.hasCompletedHours(9)) == true;
      console.log('hasCompletedHours', hasCompletedHours);
      if (!hasCompletedHours) {
        // show bottom-sheet and request reason
        setRequestEarlyCheckoutReason(true);
        return;
      }
      const r = await datalayer.attendanceLayer
        .clockOut()
        .catch(e => Alert.alert('Error', e?.['message']));
      newValue = !r?.['success'];
    } else {
      const r = await datalayer.attendanceLayer
        .clockIn()
        .catch(e => Alert.alert('Error', e?.['message']));
      console.log('r is', r);
      newValue = r?.['success'];
    }
    fetchClockinAsync()?.catch(e => Alert.alert());
  };

  handleCheckInOutClick = () => {
    setLoading(true);
  };

  const handleViewAttendanceClicked = () => {
    router.navigate('../attendance');
  };

  const formatToHhMm = useCallback(date => {
    if (!!!date) return '00:00';
    const d = new Date(date);
    return `${d?.getHours() < 10 ? '0' : ''}${d?.getHours()}:${
      d?.getMinutes() < 10 ? '0' : ''
    }${d?.getMinutes()}`;
  });

  const formatTotalHours = ({hours = 0, minutes = 0}) => {
    return `${hours < 10 ? '0' : ''}${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerBg}>
          <View style={styles.header}>
            <TouchableOpacity activeOpacity={0.8} oncPress={handleProfileClick}>
              <View>
                {user?.['avatar'] ? (
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
                ) : (
                  <UserIcon
                    width={80}
                    height={80}
                    style={{color: '#D9D9D9', marginTop: 12}}
                  />
                )}
              </View>
            </TouchableOpacity>
            <View>
              <Text style={styles.textB}>{user?.['name']}</Text>
              <Text style={styles.textC}>Mark Your Attendance!</Text>
            </View>
          </View>
        </View>
        <BGIcon style={{position: "absolute",right:0,}}></BGIcon>
        <View style={styles.indexCard}>
          <Text style={{marginTop: 27, fontWeight: 500, fontSize: 32}}>
            {time.toTimeString().substring(0, 5)}
          </Text>
          <Text style={{color: '#A0A0A0',fontSize:16,fontWeight: 400,lineHeight:26,}}>{time.toDateString()}</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
              padding: 15,
              backgroundColor: '#E2E6EA',
              borderRadius: 1000,
              
            }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleCheckInOutClick}>
              <View
                style={{
                  backgroundColor: btnColor,
                  width: 97,
                  height: 97,
                  borderRadius: 1000,
                  borderWidth: 6.73,
                  borderColor:"#fff",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    marginTop: 5,
                    marginBottom: 10,
                    textAlign: 'center',
                  }}>
                  CLOCK{`${clockinStatus ? '\nOUT' : '\nIN'}`}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

         

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 26,
            }}>
            <View
              style={{
                alignItems: 'center',
                marginHorizontal: 12,
                marginVertical: 19,
              }}>

              <Clockin width={26} height={32} />

              <Text
                style={{
                  textAlign: 'center',
                  lineHeight:21,
                  fontWeight:600,
                  color: '#000',
                  fontSize: 14,
                  
                }}>
                {formatToHhMm(clockinTime)}
                {'\n'}
                <Text style={{color:'#A0A0A0',fontSize:12,fontWeight:400,lineHeight:18,}}>
                Clock in
                </Text>
              </Text>
            </View>

            <View style={{alignItems: 'center', marginHorizontal: 12}}>
              <Clockout width={30} height={32} />
              <Text
                style={{
                  textAlign: 'center',
                  lineHeight:21,
                  fontWeight:600,
                  color: '#000',
                  fontSize: 14,
                }}>
                {formatToHhMm(clockoutTime)}
                {'\n'}
                <Text style={{color:'#A0A0A0',fontSize:12,fontWeight:400,lineHeight:18,}}>
                Clock out
                </Text>
              </Text>
            </View>

            <View style={{alignItems: 'center', marginHorizontal: 12}}>
              <Clockmarked width={27} height={32} />
              <Text
                style={{
                  textAlign: 'center',
                  lineHeight:21,
                  fontWeight:600,
                  color: '#000',
                  fontSize: 14,
                }}>
                {formatTotalHours(totalHours ?? {hours: 0, minutes: 0})}
                {'\n'}
                <Text style={{color:'#A0A0A0',fontSize:12,fontWeight:400,lineHeight:18,}}>
                Total hrs
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <Btn
          handleClick={handleViewAttendanceClicked}
          style={{
            width: 328,
            borderColor: '#7647EB',
            borderWidth: 1,
            elevation: 0,
            alignSelf: 'center',
            marginVertical: 20,
            borderRadius: 10,
            color: '#7647EB',
            backgroundColor: '#fff',
          }}
          title={'View Your Attendance'}
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
            onClose={() => {
              fetchClockinAsync();
              setRequestEarlyCheckoutReason(false);
            }}
          />
        </View>
      )}
      <Modal
        style={{backgroundColor: '#fff0'}}
        visible={loading}
        transparent={true}
        onDismiss={() => {
          setLoading(false);
        }}>
        <View
          style={{
            display: 'flex',
            backgroundColor: '#0003',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <View
            style={{backgroundColor: '#fff', padding: '50', borderRadius: 4,}}>
            <Text>Loading...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
    gap: 25,
    
  },
  header: {
    width: 328,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 8,
  },
  headerBg: {
    backgroundColor: '#7647EB',
    width: '100%',
    height: 227,
    flexDirection: 'column',
    paddingVertical: 30,
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
