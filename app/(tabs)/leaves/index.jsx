import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LeavesOverview from '../../components/leaves/overview';
import styles from '../../components/theme';
import LeaveCard from '../../components/leaves/leaveCard';
import { useLeaves } from '../../../datalayer/datalayer'; // Custom hook
import PlusIcon from '../../../assets/icons/plus.svg';
import { router, useNavigation } from 'expo-router';

const LeavesTab = () => {
  const [[leaves, leavesTypes], fetchLeavesAsync, setLeaves] = useLeaves(); // Assuming setLeaves is used to update state
  const [loading, setLoading] = useState(false);
  const nav = useNavigation();

  useEffect(() => {
    setLoading(true);
    fetchLeavesAsync()?.catch(e => Alert.alert('Error', e?.message));
  }, []); // Empty dependency ensures it runs once

  useEffect(() => {
    if (leaves && leavesTypes) {
      setLoading(false); // Data loaded
    }
  }, [leaves, leavesTypes]);

  // Handle the case when adding a new leave
  const handleLeaveHistoryClick = () => {
    router.navigate('/leaves/leave-history');
  };

  const handleAddNewLeave = () => {
    router.navigate('/leaves/request-leave', {
      onLeaveAdded: (newLeave) => {
        setLeaves((prevLeaves) => [newLeave, ...prevLeaves]); // Add new leave to the front of the list
      },
    });
  };

  return (
    <SafeAreaView
      style={[
        styles.flex,
        styles.column,
        styles.screenBg,
        styles.gap(18),
        {
          flex: 1,
          alignItems: 'stretch',
          paddingHorizontal: 16,
          overflow: 'visible',
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.flex,
          styles.column,
          styles.gap(18),
          { alignItems: 'stretch', overflow: 'visible', paddingBottom: 10 },
        ]}
      >
        <Text
          style={[styles.font(500), styles.size(20), { color: '#7647EB', textAlign: 'center' }]}
        >
          My Leaves
        </Text>

        {leavesTypes ? (
          <View style={{ gap: 10 }}>
            <Text style={[styles.font(500), styles.size(16), { color: '#414141' }]}>
              Leaves Overview
            </Text>
            <LeavesOverview key={'090078601'} leaves={leaves} leavesTypes={leavesTypes} />
          </View>
        ) : (
          <Text>Loading...</Text>
        )}

        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginEnd: 5, flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
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
                      marginBottom: 10,
                    },
                  ]}
                >
                  Leave History
                </Text>
              </Pressable>
            </View>

            {loading ? (
              <Text style={[styles.font(400), styles.size(14)]}>Loading...</Text>
            ) : !!!leaves?.length === 0 ? ( // Check if leaves is empty
              <Text style={[styles.font(400), styles.size(14)]}>No Data</Text>
            ) : null}

            <View style={{ gap: 10 }}>
              {leaves?.map((e) => (
                <LeaveCard
                  leaveType={e?.leave_type}
                  appliedOn={e?.applied_on}
                  key={e?.['id']}
                  data={[
                    { heading: 'Leave type', value: e?.['leave_type'] },
                    { heading: 'Start Date', value: e?.['start_date'] },
                    { heading: 'End Date', value: e?.['end_date'] },
                    { heading: 'Leave Reason', value: e?.['leave_reason'] },
                    {
                      heading: 'STATUS',
                      value: e?.['status'],
                      rowStyle: {
                        ...styles.bg(
                          e?.['status'].toLocaleLowerCase() === 'pending'
                            ? '#FDC93333'
                            : e?.['status'].toLocaleLowerCase() === 'rejected'
                            ? '#D5213C33'
                            : '#11A12033'
                        ),
                      },
                      style: {
                        color:
                          e?.['status'].toLocaleLowerCase() === 'pending'
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
              ))}
            </View>
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
        }}
      >
        <PlusIcon />
      </Pressable>
    </SafeAreaView>
  );
};

export default LeavesTab;
