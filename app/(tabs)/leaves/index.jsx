import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LeavesOverview from '../../components/leaves/overview';
import styles from '../../components/theme';
import LeaveCard from '../../components/leaves/leaveCard';
import {useLeaves, useUser} from '../../../datalayer/datalayer';
import PlusIcon from '../../../assets/icons/plus.svg';
import {router, useFocusEffect, useNavigation} from 'expo-router';

const LeavesTab = () => {
  const [[leaves, leavesTypes], fetchLeavesAsync] = useLeaves();
  const user = useUser();
  const [loading, setLoading] = useState(false);

  const nav = useNavigation();

  useEffect(() => {
    setLoading(false);
  }, [leaves, leavesTypes]);

  // Use useFocusEffect correctly
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchLeavesAsync()?.catch(e => Alert.alert('Error', e?.['message']));
    }, [nav]), // Dependency array includes nav
  );

  handleLeaveHistoryClick = () => {
    router.navigate('/leaves/leave-history');
  };

  handleAddNewLeave = () => {
    router.navigate(`/leaves/request-leave`);
  };

  return (
    <SafeAreaView
      style={[
        styles.flex,
        styles.column,
        styles.alignItemsCenter,
        styles.screenBg,
        styles.gap(18),
        {flex: 1},
      ]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.flex,
          styles.column,
          styles.alignItemsCenter,
          styles.screenBg,
          styles.gap(18),
        ]}>
        <Text style={[styles.font(600), styles.size(24)]}>My Leaves</Text>
        {leavesTypes ? (
          <LeavesOverview
            key={'090078601'}
            leaves={leaves}
            leavesTypes={leavesTypes}
          />
        ) : (
          <Text>Loading...</Text>
        )}
        <View style={{flexDirection: 'row'}}>
          <View style={{marginEnd: 5, flex: 1, display: 'flex'}}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <View></View>
              <Pressable onPress={handleLeaveHistoryClick}>
                <Text
                  style={[
                    styles.ph(20),
                    styles.pv(10),
                    styles.font(400),
                    styles.size(16),
                    {
                      borderWidth: 1,
                      borderRadius: 5,
                      borderColor: '#7647EB',
                      fontWeight: 500,
                      lineHeight: 23,
                      alignItems: 'center',
                      color: '#7647EB',
                      marginBottom: 8,
                    },
                  ]}>
                  Leave History
                </Text>
              </Pressable>
            </View>
            {loading ? (
              <Text style={[styles.font(400), styles.size(14)]}>
                Loading...
              </Text>
            ) : leaves.length < 0 ? (
              <Text style={[styles.font(400), styles.size(14)]}>No Data</Text>
            ) : null}
            {leaves?.map(e => {
              console.info('leave is: ' + JSON.stringify(e));
              return (
                <LeaveCard
                  leaveType={e?.leave_type}
                  appliedOn={e?.applied_on}
                  key={e?.['id']}
                  data={[
                    {
                      heading: 'Leave type',
                      value: e?.['leave_type'],
                      rowStyle: {},
                    },
                    {heading: 'Start Date', value: e?.['start_date']},
                    {heading: 'End Date', value: e?.['end_date']},
                    {heading: 'Leave Reason', value: e?.['leave_reason']},
                    {
                      heading: 'STATUS',
                      value: e?.['status'],
                      rowStyle: {
                        ...styles.bg(
                          e?.['status'].toLocaleLowerCase() == 'pending'
                            ? '#FDC93333'
                            : e?.['status'].toLocaleLowerCase() == 'rejected'
                            ? '#D5213C33'
                            : '#11A12033',
                        ),
                      },
                      style: {
                        color:
                          e?.['status'].toLocaleLowerCase() == 'pending'
                            ? '#FDC933'
                            : '#fff',
                        flex: 1,
                        alignItems: 'center',
                        textAlign: 'center',
                      },
                      headingStyle: {
                        backgroundColor: '#e4dafb',
                        borderBottomLeftRadius: 10,
                        color: '#7647EB',
                        fontSize: 10,
                        fontWeight: 600,
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: 8.73,
                      },
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <Pressable
        onPress={handleAddNewLeave}
        style={{
          position: 'absolute',
          bottom: 29,
          right: 13,
          padding: 16,
          backgroundColor: '#7647EB',
          borderRadius: 5,
          elevation: 4,
          zIndex: 1,
        }}>
        <PlusIcon />
      </Pressable>
    </SafeAreaView>
  );
};

export default LeavesTab;
