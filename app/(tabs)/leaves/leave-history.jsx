import React, {useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../../components/theme';
import {useFocusEffect} from 'expo-router';
import {Alert, ScrollView, Text} from 'react-native';
import LeaveCard from '../../components/leaves/leaveCard';
import datalayer from '../../../datalayer/datalayer';

const LeaveHistory = () => {
  const [leaves, setLeaves] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // Use useFocusEffect correctly
  useFocusEffect(
    useCallback(() => {
      // Async function to fetch data
      const fetchAsync = async () => {
        try {
          const lvs = (await datalayer.leavesLayer.getLeaves())?.['leaves'];
          const lvsTypes = (
            await datalayer.leavesLayer.getLeavesTypesAndAllowed()
          )?.['leaveType'];

          const lvsWithType = lvs?.map(e => ({
            ...e,
            leave_type: lvsTypes?.find(
              f => f?.['id'] === e?.['leave_type_id'],
            )?.['title'],
          }));

          setUser(await datalayer.authLayer.getUserAsync());
          setLeaves(lvsWithType);
          setLoading(false);
        } catch (error) {
          Alert.alert("Error", error?.["message"])
        }
      };

      fetchAsync();

      // Cleanup function to clear the state (if needed)
      return () => {
        setLeaves([]);
        setUser(null);
      };
    }, []),
  );

  return (
    <SafeAreaView
      style={[styles.pv(50), styles.ph(10), styles.screenBg, {flex: 1}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gap(10)}>
        {!!loading && <Text>Loading...</Text>}
        {!loading &&
          leaves?.map(e => {
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaveHistory;
