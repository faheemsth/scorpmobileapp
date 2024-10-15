import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Calendar, CalendarList} from 'react-native-calendars';
import ReasonView from './reason-view';

import Clockin from '../../../assets/icons/clockin.svg';
import Clockinb from '../../../assets/icons/clockinb.svg';
import Clockout from '../../../assets/icons/clockout.svg';
import Clockoutb from '../../../assets/icons/clockoutb.svg';
import Cross from '../../../assets/icons/cross.svg';
import ClockMarked from '../../../assets/icons/clockmarked.svg';
import ArrowRight from '../../../assets/icons/ArrowRight.svg';
import Chevron from '../../../assets/icons/chevron.svg';
import CalendarIcon from '../../../assets/icons/calendar.svg';
import datalayer from '../../../datalayer/datalayer';
import ArrowIcon from '../../../assets/icons/incomming.svg';

getDay = (date = new Date()) => {
  let day = {short: '', full: ''};
  switch (date.getDay()) {
    case 0:
      day = {short: 'Sun', full: 'Sunday'};
      break;
    case 1:
      day = {short: 'Mon', full: 'Monday'};
      break;
    case 2:
      day = {short: 'Tue', full: 'Tuesday'};
      break;
    case 3:
      day = {short: 'Thu', full: 'Thursday'};
      break;
    case 4:
      day = {short: 'Wed', full: 'Wednesday'};
      break;
    case 5:
      day = {short: 'Fri', full: 'Friday'};
      break;
    case 6:
      day = {short: 'Sat', full: 'Satureday'};
      break;
    default:
      day = {short: '', full: ''};
      break;
  }
  return day;
};

const colors = {
  black: '#555',
  blue: '#08f',
  green: '#1a2',
  red: '#d23',
  yellow: '#fd3',
  bg: '#fff',
};

export function AttendanceRowNew({
  date,
  clockInTime,
  clockOutTime,
  totalHours,
  status,
  onReasonClick,
  minimumTotalHours = 8,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#6661',
        margin: 10,
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'center',
          margin: 2,
          padding: 2,
          paddingHorizontal: 4,
          borderWidth: 1,
          borderRadius: 2,
          borderColor: colors.black,
        }}>
        <Text
          style={{
            color: colors.black,
            textAlign: 'center',
            fontFamily: 'outfit-900',
            fontSize: 12,
          }}>
          {date?.getDate() < 10 ? '0' : ''}
          {date?.getDate()}
        </Text>
        <Text
          style={{
            color: colors.black,
            textAlign: 'center',
            fontFamily: 'outfit-600',
            fontSize: 9,
          }}>
          {getDay(date)?.short}
        </Text>
      </View>
      <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
        <ArrowIcon width={10} height={10} style={{color: colors.blue}} />
        <Text
          style={{
            color: !!clockInTime ? colors.black : colors.red,
            textAlign: 'center',
            fontFamily: 'outfit-400',
            fontSize: 12,
          }}>
          {clockInTime ?? '00:00'}
        </Text>
      </View>
      <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
        <ArrowIcon
          width={10}
          height={10}
          style={{
            color:
              totalHours?.substring(0, 2) >= minimumTotalHours
                ? colors.green
                : colors.red,
            transform: [{rotateZ: '-90deg'}],
          }}
        />
        <Text
          style={{
            color: !!clockOutTime ? colors.black : colors.red,
            textAlign: 'center',
            fontFamily: 'outfit-400',
            fontSize: 12,
          }}>
          {clockOutTime ?? '00:00'}
        </Text>
      </View>
      <Pressable
        onPress={() => {
          onReasonClick?.();
        }}
        style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
        <Text
          style={{
            color:
              totalHours?.substring(0, 2) >= minimumTotalHours
                ? colors.green
                : colors.red,
            textAlign: 'center',
            fontFamily: 'outfit-400',
            fontSize: 12,
          }}>
          {totalHours ?? '00:00'}
        </Text>
        {!!onReasonClick ? (
          <Chevron width={8} height={8} style={[styles.flipX]} />
        ) : (
          <View style={{width: 8}} />
        )}
      </Pressable>
    </View>
  );
}

const ViewAttendanceScreen = () => {
  const navigation = useNavigation();
  chips = ['All', 'Full Day', 'Early Leave', 'Absent'];
  const [attendanceData, setAttendanceData] = useState([]);

  const [showReason, setShowReason] = useState(false);
  const [reasonToShow, setReasonToShow] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [attendance, setAttendance] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    setSelectedMonth(new Date());
  }, []);

  const [activeChip, setActiveChip] = React.useState(0);
  useEffect(() => {
    const asyncCall = async () => {
      const firstDate = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth(),
        1,
      );
      const lastDate = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() + 1,
        0,
      );

      const startDate = `1-${
        firstDate.getMonth() + 1
      }-${firstDate.getFullYear()}`;
      const endDate = `${lastDate.getDate()}-${
        lastDate.getMonth() + 1
      }-${lastDate.getFullYear()}`;
      const data = (
        await datalayer.attendanceLayer.getAttendanceViewData(
          startDate,
          endDate,
        )
      )?.['data']?.map(d => {
        return {
          ...d,
          status:
            d?.status?.toLowerCase?.() == 'early punch out'
              ? 'Early Leave'
              : d?.status?.toLowerCase?.() == 'present'
              ? 'Full Day'
              : d?.status,
        };
      });

      setAttendanceData(data);
      setAttendance(data);
      setIsLoading(false);
    };
    asyncCall().catch(e => Alert.alert('Error', e?.['message']));
  }, [selectedMonth]);

  React.useEffect(() => {
    console.log('active chip is ', activeChip);
    if (chips[activeChip].toLowerCase().trim() == 'all')
      setAttendance(attendanceData);
    else
      setAttendance(
        attendanceData.filter(
          e => e.status.toLowerCase() == chips[activeChip].toLowerCase(),
        ),
      );
  }, [activeChip]);

  handleChipClick = index => {
    setActiveChip(index);
  };
  handleReasonClick = reason => {
    setReasonToShow(reason);
    setShowReason(true);
  };

  onReasonClose = () => setShowReason(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{fontFamily: 'outfit-600', fontSize: 24, textAlign: 'center'}}>
        Attendance
      </Text>
      {/* Selected date view start */}
      <CalendarList
        style={{backgroundColor: 'transparent'}}
        calendarStyle={{
          height: 48,
          backgroundColor: 'transparent',
          overflow: 'hidden',
        }}
        pagingEnabled={true}
        horizontal={true}
        calendarHeight={48}
        onMonthChange={date => {
          setSelectedMonth(new Date(date.dateString));
          setIsLoading(true);
        }}
        renderArrow={direction => (
          <Chevron style={direction == 'right' ? styles.flipX : null} />
        )}
        hideArrows={false}
      />
      {/* Selected date view end */}

      {/* chips view start */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={{flexDirection: 'row', flexGrow: 0, flexShrink: 0, flex: 0}}
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {chips &&
          Array.isArray(chips) &&
          chips?.map((str, index) => (
            <>
              <Pressable
                key={index}
                onPress={() => handleChipClick(index)}
                style={[
                  styles.button,
                  activeChip == index ? styles.active : {},
                ]}>
                <Text style={activeChip == index ? styles.active : {}}>
                  {str}
                </Text>
              </Pressable>
            </>
          ))}
      </ScrollView>
      {/* chips view end */}

      {/* Attendace view start */}
      <ScrollView
        style={{
          paddingBottom: 20,
          padding: 10,
        }}>
        {!!isLoading ? (
          <Text style={{fontFamily: 'outfit-400'}}>Loading...</Text>
        ) : attendance?.length < 1 ? (
          <Text style={{fontFamily: 'outfit-400'}}>No Data...</Text>
        ) : (
          attendance?.map((e, index) => {
            if (e?.['status']?.toLowerCase() == 'holiday') {
              return (
                <View
                  key={index}
                  activeOpacity={0.7}
                  style={{alignItems: 'center', marginTop: 17}}>
                  <View
                    style={{
                      backgroundColor: colors.yellow + '1',
                      borderWidth: 1,
                      borderColor: colors.yellow + '2',
                      width: 330,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      padding: 10,
                    }}>
                    <Text style={{color: colors.black}}>
                      Weekend Off: {e?.['date']}
                    </Text>
                  </View>
                </View>
              );
            }
            const reason = e?.['early_check_out_reason'];
            return (
              <AttendanceRowNew
                key={index}
                date={new Date(e?.['date'])}
                clockInTime={e?.['clock_in']?.substring(0, 5)}
                clockOutTime={e?.['clock_out']?.substring(0, 5)}
                totalHours={e?.['hours_worked']?.substring(0, 5)}
                status={e?.['status']}
                onReasonClick={
                  !!reason ? () => handleReasonClick(reason) : undefined
                }
              />
            );
          })
        )}

        {/* Attendance Durations End */}
      </ScrollView>
      {/* Attendance view end */}

      {!!showReason && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            height: '100%',
            backgroundColor: '#0002',
          }}>
          <ReasonView onClose={onReasonClose} reason={reasonToShow} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flipX: {
    transform: [{scaleX: -1}],
  },
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    gap: 17,
    position: 'relative',
  },
  button: {
    borderWidth: 1,
    borderColor: '#6C6C6C',
    borderRadius: 20,
    padding: 6,
    paddingHorizontal: 16,
    alignItems: 'center',
    width: 'auto',
    marginHorizontal: 8.5,
    fontSize: 16,
    color: '#6C6C6C',
    marginVertical: 2,
  },
  active: {
    borderColor: '#0084FF',
    color: '#0084FF',
  },
  buttonB: {
    borderWidth: 1,
    borderColor: '#6C6C6C',
    borderRadius: 20,
    padding: 6,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    fontSize: 16,
    color: '#6C6C6C',
    fontSize: 16,
  },
  buttonText: {
    color: '#11A120',
  },
  buttonTextb: {
    color: '#D5213C',
  },
  buttonTextc: {
    color: '#FDC933',
  },
  rowDay: {
    borderWidth: 1,
    borderColor: '#6C6C6C',
    color: 'black',
    justifyContent: 'center',
    padding: 7,
    borderRadius: 5,
    height: 50,
    marginTop: 25,
    minWidth: 45,
    flexGrow: 1,
  },
  rowClockInImage: {
    height: 26,
    width: 26,
    marginTop: 19,
    resizeMode: 'contain',
  },
  rowClockIn: {
    textAlign: 'center',
    marginTop: 3,
    color: 'rgba(108, 108, 108, 1)',
  },
  rowClockOut: {
    textAlign: 'center',
    marginTop: 3,
    color: 'rgba(108, 108, 108, 1)',
  },
  rowTotalHours: {
    textAlign: 'center',
    marginTop: 4,
    color: 'rgba(108, 108, 108, 1)',
  },
});

export default ViewAttendanceScreen;
