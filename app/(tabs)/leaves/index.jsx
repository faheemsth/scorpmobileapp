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
import datalayer, { useLeaves, useUser } from '../../../datalayer/datalayer';
import Btn from '../../components/btn';
import PlusIcon from '../../../assets/icons/plus.svg';
import {router, useFocusEffect, useNavigation} from 'expo-router';

const LeavesTab = () => {
  const [[leaves, leavesTypes], fetchLeavesAsync] = useLeaves()
  const user = useUser()
  const [loading, setLoading] = useState(false);

  const nav = useNavigation();

  useEffect(() => {
    setLoading(false);
  }, [leaves, leavesTypes]);

  // Use useFocusEffect correctly
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchLeavesAsync()?.catch(e=>Alert.alert("Error", e?.["message"]))

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
        {width: '100%', height: '100%', position: 'relative'},
      ]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.flex,
          styles.column,
          styles.alignItemsCenter,
          styles.screenBg,
          styles.gap(18),
          {width: '100%'},
        ]}>
        <Text style={[styles.font(600), styles.size(24)]}>My Leaves</Text>
        {!!leaves && leavesTypes && (
          <LeavesOverview
            key={'090078601'}
            leaves={leaves}
            leavesTypes={leavesTypes}
          />
        )}
        <View style={[styles.gap(10)]}>
          <View
            style={[
              styles.flex,
              styles.row,
              styles.justifyBetween,
              {width: 317},
            ]}>
            <Text
              style={[
                styles.font(400),
                styles.size(17),
                styles.bg('#167BC4'),
                styles.ph(16),
                styles.pv(8),
                {color: '#fff', borderRadius: 2000},
              ]}>
              Approvals
            </Text>
            <Pressable
              onPress={handleLeaveHistoryClick}
              style={[
                styles.ph(16),
                styles.pv(8),
                {borderWidth: 1, borderRadius: 200},
              ]}>
              <Text style={[styles.font(400), styles.size(17)]}>
                Leave History
              </Text>
            </Pressable>
          </View>

          {loading ? <Text>Loading...</Text> : null}
          {leaves?.map(e => {
            return (
              <LeaveCard
                url={user?.['avatar']}
                key={e?.['id']}
                uName={user?.['name']}
                data={[
                  {heading: 'Leave type', value: e?.['leave_type']},
                  {heading: 'Applied on', value: e?.['applied_on']},
                  {heading: 'Start Date', value: e?.['start_date']},
                  {heading: 'End Date', value: e?.['end_date']},
                  {heading: 'Leave Reason', value: e?.['leave_reason']},
                  {
                    heading: 'Status',
                    value: e?.['status'],
                    style: {
                      ...styles.ph(10),
                      ...styles.pv(3.5),
                      ...styles.bg(
                        e?.['status'].toLocaleLowerCase() == 'pending'
                          ? '#FDC933'
                          : e?.['status'].toLocaleLowerCase() == 'rejected'
                          ? '#D5213C'
                          : '#11A120',
                      ),

                      borderRadius: 1000,
                      color:
                        e?.['status'].toLocaleLowerCase() == 'pending'
                          ? '#000'
                          : '#fff',
                    },
                  },
                ]}
              />
            );
          })}
        </View>
      </ScrollView>
      <Pressable
        onPress={handleAddNewLeave}
        style={{
          position: 'absolute',
          bottom: 29,
          right: 13,
          padding: 16,
          backgroundColor: '#167BC4',
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
