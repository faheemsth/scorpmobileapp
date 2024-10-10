import {View, Text, ScrollView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../theme';
import CircularProgress from '../circular-progress';

const LeavesOverview = ({leaves, leavesTypes}) => {
  const [totalLeavesCount, setTotalLeavesCount] = useState(0);

  useEffect(() => {
    fetchAsync = async () => {
      const lvsTotalCount = leavesTypes
        ?.map(e => e?.['days'])
        ?.reduce((previous, current) => previous + current, 0);
      setTotalLeavesCount(lvsTotalCount);
    };
    fetchAsync().catch(e=>Alert.alert("Error", e?.["message"]));
  }, [leavesTypes]);

  return (
    !!leaves &&
    !!leavesTypes && (
      <View
        style={[
          {
            width: 346,
            borderRadius: 20,
            paddingLeft: 23,
            paddingVertical: 13,
          },
          styles.whiteBg,
          styles.flex,
          styles.column,
          styles.gap(5),
        ]}>
        <Text style={[styles.font(500), styles.size(16)]}>Leaves Overview</Text>

        <CircularProgress
          progress={
            leaves.length / (totalLeavesCount > 0 ? totalLeavesCount : 1)
          }
          strokeWidth={12}
          progressRotationOffset={-90}
          size={160}>
          <Text style={[styles.font(400), styles.size(14)]}>Leave Balance</Text>
          <Text style={[styles.font(500), styles.size(24)]}>
            {totalLeavesCount - leaves.length}
          </Text>
        </CircularProgress>
        <View
          style={[
            styles.flex,
            styles.row,
            styles.justifyContentCenter,
            styles.gap(10),
          ]}>
          <View style={[styles.flex, styles.row, styles.justifyContentCenter, styles.gap(5)]}>
            <View
              style={{
                backgroundColor: '#D9D9D9',
                borderRadius: 1000,
                width: 14,
                height: 14,
                marginTop: 5,
              }}
            />
            <View>
              <Text style={[styles.font(400), styles.size(13)]}>
                Total Leaves
              </Text>
              <Text style={[styles.font(500)]}>{totalLeavesCount}</Text>
            </View>
          </View>
          <View style={[styles.flex, styles.row, styles.gap(5)]}>
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
              </Text>
              <Text style={[styles.font(500)]}>{leaves?.length}</Text>
            </View>
          </View>
        </View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={[
            styles.row,
            styles.justifyEvenly,
            styles.gap(25),
          ]}>
          {leavesTypes?.map(e => (
            <View
              style={[styles.column, styles.gap(5), {alignItems: 'center'}]}>
              <CircularProgress
                progress={e?.['used'] / e?.['days']}
                strokeWidth={5}
                progressRotationOffset={-90}
                size={50}>
                <Text style={[styles.font(400), styles.size(15)]}>
                  {e?.['days'] - e?.['used']}
                </Text>
              </CircularProgress>
              <Text style={[styles.font(400), styles.size(13)]}>
                {e?.['title']}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    )
  );
};

export default LeavesOverview;
