import {View, Text, ScrollView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../theme';
import CircularProgress from '../circular-progress';

const LeavesOverview = ({leaves, leavesTypes}) => {
  const [totalLeavesCount, setTotalLeavesCount] = useState({used: 0, days: 0});
  const [leaveTypesViewData, setLeaveTypesViewData] = useState([]);

  useEffect(() => {
    fetchAsync = async () => {
      const lvsTotalCount = leavesTypes
        ?.map(e => {
          console.log('lvs', e?.['days'], e?.['used']);
          return {days: e?.days, used: e?.used};
        })
        ?.reduce(
          (previous, current) => {
            console.log(previous, current);
            return {
              used: previous.used + current.used,
              days: previous.days + current.days,
            };
          },
          {used: 0, days: 0},
        );
      setTotalLeavesCount(lvsTotalCount);

      const otherLeaves = Array(...leavesTypes)
        .slice(3)
        .reduce(
          (p, n) => {
            console.log('p', p, 'n', n);
            const returnable = {
              used: p?.used + n?.used,
              days: p?.days + n?.days,
            };
            console.log('returnable', returnable);
            return returnable;
          },
          {
            used: 0,
            days: 0,
          },
        );
      const lt = [
        ...Array(...leavesTypes)
          ?.slice(0, 3)
          ?.map(e => ({
            days: e.days,
            used: e.used,
            title: e.title,
            color: e.color,
          })),
        {
          days: otherLeaves.days,
          used: otherLeaves.used,
          title: 'Others',
          color: '#007AFF',
        },
      ];
      console.log('lt is: ', lt.length, lt);
      setLeaveTypesViewData(lt);
    };
    fetchAsync().catch(e => Alert.alert('Error', e?.['message']));
  }, [leavesTypes]);

  return (
    !!leaves &&
    !!leavesTypes &&
    !!leaveTypesViewData && (
      <View
        style={[
          {
            borderRadius: 10,
            padding: 15,
            elevation: 4,
            borderColor: '#A0A0A0',
            borderWidth: 1,
            paddingVertical: 15,
            paddingHorizontal: 27,
            overflow: 'visible',
          },
          styles.whiteBg,
          styles.flex,
          styles.row,
          styles.gap(10),
        ]}>
        <View
          style={[
            {flex: 1},
            styles.column,
            styles.justifyEvenly,
            styles.gap(25),
            styles.alignItemsCenter,
            styles.justifyContentCenter,
          ]}>
          {leaveTypesViewData?.map(e => {
            console.log('leave type is', e);
            return (
              <View
                style={[
                  styles.row,
                  styles.gap(6),
                  styles.alignItemsCenter,
                  {width: 140},
                ]}>
                <CircularProgress
                  progress={e?.['used'] / (e?.['days'] > 0 ? e?.days : 1)}
                  strokeWidth={5}
                  progressRotationOffset={-90}
                  progressColor={e?.['color']}
                  size={31.85}>
                  <Text style={[styles.font(500), styles.size(10)]}>
                    {e?.['days'] - e?.['used']}
                  </Text>
                </CircularProgress>
                <Text
                  style={[
                    styles.font(500),
                    styles.size(10),
                    {textAlign: 'center', color: '#A0A0A0'},
                  ]}
                  ellipsizeMode="tail"
                  numberOfLines={2}>
                  {e?.['title']}
                </Text>
              </View>
            );
          })}
        </View>
        <View>
          <CircularProgress
            progress={
              totalLeavesCount?.used ??
              0 / (totalLeavesCount?.days > 0 ? totalLeavesCount?.days : 1)
            }
            strokeWidth={12}
            progressRotationOffset={-90}
            size={145}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <View style={{alignItems: 'center'}}>
              <Text style={[styles.font(400), styles.size(12)]}>
                Leave Balance
              </Text>
              <Text
                style={[
                  styles.font(500),
                  styles.size(24),
                  {lineHeight: 36, color: '#7647EB'},
                ]}>
                {(Math.abs(totalLeavesCount?.days - totalLeavesCount?.used ?? 0) < 10) 
                  ? '0'
                  : null}
                {totalLeavesCount?.days - totalLeavesCount?.used ?? 0}
              </Text>
            </View>
          </CircularProgress>
          <View
            style={[styles.flex, styles.column, styles.justifyContentCenter]}>
            <View
              style={[
                styles.flex,
                styles.row,
                styles.justifyContentCenter,
                styles.gap(5),
              ]}>
              <View
                style={{
                  backgroundColor: '#D9D9D9',
                  borderRadius: 1000,
                  width: 14,
                  height: 14,
                  flexDirection: 'row',
                  marginTop: 5,
                }}
              />
              <View>
                <Text style={[styles.font(400), styles.size(13)]}>
                  Total Leaves
                  <Text style={[styles.font(600)]}>
                    {' '}
                    {totalLeavesCount?.days}
                  </Text>
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.flex,
                styles.row,
                styles.justifyContentCenter,
                styles.gap(5),
                styles.row,
              ]}>
              <View
                style={{
                  backgroundColor: '#FDC933',

                  borderRadius: 1000,
                  width: 14,
                  height: 14,
                  marginTop: 5,
                }}
              />
              <View>
                <Text style={[styles.font(400), styles.size(13)]}>
                  Used Leaves
                  <Text style={[styles.font(600)]}>
                    {' '}
                    {totalLeavesCount?.used ?? 0}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  );
};

export default LeavesOverview;
