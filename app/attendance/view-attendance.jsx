import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Calendar, CalendarList} from 'react-native-calendars';

import Clockin from '../../assets/icons/clockin.svg';
import Clockinb from '../../assets/icons/clockinb.svg';
import Clockout from '../../assets/icons/clockout.svg';
import Clockoutb from '../../assets/icons/clockoutb.svg';
import Cross from '../../assets/icons/cross.svg';
import ClockMarked from '../../assets/icons/clockmarked.svg';
import ArrowRight from '../../assets/icons/ArrowRight.svg';
import Chevron from '../../assets/icons/chevron.svg';
import CalendarIcon from '../../assets/icons/calender.svg';
import datalayer from '../../datalayer/datalayer';
import ReasonView from './reason-view';

/**
 *
 * @param {date: string, clockInTime: string, clockOutTime: string, totalHours: string, status: string, onReasonClick: Function} sprop
 * @returns
 */
export function AttendaceRow(prop) {
  return (
    <View
      style={{
        marginHorizontal: 17,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 17,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.25)',
        borderStyle: 'dashed',
      }}>
      <View style={styles.rowDay}>
        <Text>{prop?.date}</Text>
      </View>

      <View style={{alignItems: 'center', marginHorizontal: 12, flexGrow: 1}}>
        {prop?.status?.toLowerCase() == 'absent' ? (
          <Clockinb style={styles.rowClockInImage} />
        ) : (
          <Clockin style={styles.rowClockInImage} />
        )}
        <Text style={styles.rowClockIn}>
          {prop?.status?.toLowerCase() == 'absent'
            ? '00:00\n'
            : prop?.clockInTime + '\n'}
          Clock in
        </Text>
      </View>
      <View style={{alignItems: 'center', marginHorizontal: 12, flexGrow: 1}}>
        {prop?.status?.toLowerCase() == 'absent' ? (
          <Clockoutb style={styles.rowClockInImage} />
        ) : (
          <Clockout style={styles.rowClockInImage} />
        )}
        <Text style={styles.rowClockOut}>
          {prop?.status?.toLowerCase() == 'absent'
            ? '00:00\n'
            : prop?.clockOutTime + '\n'}
          Clock out
        </Text>
      </View>
      <View style={{alignItems: 'center', marginHorizontal: 12, flexGrow: 1}}>
        {prop?.status?.toLowerCase() == 'absent' ? (
          <Cross style={styles.rowClockInImage} />
        ) : (
          <ClockMarked style={styles.rowClockInImage} />
        )}

        <Text style={styles.rowTotalHours}>
          {prop?.status?.toLowerCase() == 'absent'
            ? '00:00\n'
            : prop?.totalHours + '\n'}
          Total hrs
        </Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        {!!prop?.onReasonClick && (
          <>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                height: 20,
              }}
              onPress={() => prop?.onReasonClick?.()}>
              <Text
                style={{
                  color: '#E10A0A',
                  textDecorationLine: 'underline',
                }}>
                Reason
              </Text>
              <ArrowRight
                style={{marginStart: 1, width: 12, resizeMode: 'contain', color: "#000"}}
              />
            </TouchableOpacity>
          </>
        )}

        <Text
          style={[
            styles.buttonB,
            prop?.status?.toLowerCase() === 'absent'
              ? styles.buttonTextb
              : prop?.status?.toLowerCase() === 'late in'
              ? styles.buttonTextc
              : styles.buttonText,
          ]}>
          {prop?.status}
        </Text>
      </View>
    </View>
  );
}

const ViewAttendanceScreen = () => {
  const navigation = useNavigation();
  chips = ['All', 'Full Day', 'Early Leave', 'Absent'];
  const [attendanceData, setAttendanceData] = useState([]);

  const [showReason, setShowReason] = useState(false);
  const [reasonToShow, setReasonToShow] = useState();

  const [attendance, setAttendance] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    navigation.setOptions({headerTitle: 'Attendance', headerTransparent: true});
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

      const data = await datalayer.attendanceLayer.getAttendanceViewData(
        startDate,
        endDate,
      );

      console.log('attendances', data['data'].length);
      setAttendanceData(data['data']);
      setAttendance(data['data']);
    };
    asyncCall().catch(console.error);
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
    setReasonToShow("yo I am yoyoyoymo yo yoyoy o oyoo oyo oyo oyo yoyo oyo yo yo yo y oyo");
    setShowReason(true);
  };

  onReasonClose = () => setShowReason(false);

  return (
    <SafeAreaView style={styles.container}>
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
        }}
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
          height: 50,
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
          backgroundColor: '#D9D9D966',
          paddingBottom: 20,
          flexGrow: 1,
        }}
        contentContainerStyle={{flexGrow: 1, minHeight: '100%'}}>
        {attendance.map((e, index) => {
          if (e?.['status']?.toLowerCase() == 'holiday') {
            return (
              <View
                key={index}
                activeOpacity={0.7}
                style={{alignItems: 'center', marginTop: 17}}>
                <View
                  style={{
                    backgroundColor: '#167BC44A',
                    width: 330,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  <Text style={{color: '#167BC4'}}>
                    Weekend Off: {e?.['date']}
                  </Text>
                </View>
              </View>
            );
          }
          const reason = e?.['early_check_out_reason'];
          return (
            <AttendaceRow
              key={index}
              date={String(e?.['date']).substring(5)}
              clockInTime={e?.['clock_in']}
              clockOutTime={e?.['clock_out']}
              totalHours={e?.['hours_worked']}
              status={e?.['status']}
              onReasonClick={
                // !!reason
                  // ?
                   () => handleReasonClick(e?.['early_check_out_reason'])
                  // : undefined
              }
            />
          );
        })}

        {/* Attendance Durations End */}
      </ScrollView>
      {/* Attendance view end */}

      {!!showReason &&(
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
    marginTop: 42,
    backgroundColor: '#EFF3F7',
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
