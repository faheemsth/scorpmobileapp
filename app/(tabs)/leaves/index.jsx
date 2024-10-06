import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LeavesOverview from '../../components/leaves/overview';
import styles from '../../components/theme';
import LeaveCard from '../../components/leaves/leaveCard';
import datalayer from '../../../datalayer/datalayer';
import Btn from '../../components/btn';
import PlusIcon from '../../../assets/icons/plus.svg';
import {router} from 'expo-router';

const LeavesTab = () => {
  const [leaves, setLeaves] = useState([]);
  const [leavesTypes, setLeavesTypes] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    fetchAsync = async () => {
      const lvs = (await datalayer.leavesLayer.getLeaves())?.['leaves'];
      const lvsTypes = (
        await datalayer.leavesLayer.getLeavesTypesAndAllowed()
      )?.['leaveType'];
      const lvsWithType = lvs.map(e => {
        return {
          ...e,
          leave_type: lvsTypes?.filter(
            f => f?.['id'] == e?.['leave_type_id'],
          )?.[0]?.['title'],
        };
      });

      const lvsTypesWithUsed = lvsTypes.map(e => {
        return {
          ...e,
          used: lvs.filter(f => f?.['leave_type_id'] == e?.['id'])?.length,
        };
      });

      setUser(await datalayer.authLayer.getUserAsync());
      setLeaves(lvsWithType);
      setLeavesTypes(lvsTypesWithUsed);
    };
    fetchAsync().catch(console.error);
  }, []);

  handleAddNewLeave = () => {
    console.log('trying to navigate');
    router.navigate('/leaves/request-leave');
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
        <Text style={[styles.font(500), styles.size(20)]}>My Leaves</Text>
        {!!leaves && leavesTypes && (
          <LeavesOverview leaves={leaves} leavesTypes={leavesTypes} />
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
          {leaves.map(e => {
            return (
              <LeaveCard
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
      <Btn
        handleClick={handleAddNewLeave}
        leading={<PlusIcon />}
        gradientColors={['#167BC4', '#6E7072']}
        title={'Add New Leave'}
        style={{position: 'absolute', bottom: 15, left: 0}}
      />
    </SafeAreaView>
  );
};

export default LeavesTab;
