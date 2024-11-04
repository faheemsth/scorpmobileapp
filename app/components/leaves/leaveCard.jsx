import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import styles from '../theme';

const LeaveCard = ({
  leaveType = 'type',
  appliedOn = '13 aug',
  data = [
    {
      heading: 'heading',
      value: 'value',
      style: StyleSheet.create({style: {}}).style,
      headingStyle: StyleSheet.create({style: {}}).style,
      rowStyle: StyleSheet.create({style: {}}).style,
    },
  ],
}) => {
  return (
    <View
      style={[
        styles.bg('#FFFFFF'),
        {marginBottom: 8},
        {
          borderRadius: 10,
          borderColor: '#A0A0A0',
          borderWidth: 1,
          elevation: 1,
          gap: 2,
          backgroundColor: '#ffffff',
          overflow: 'hidden',
        },
        styles.gap(5),
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            color: '#33CC32',
            fontSize: 15.21,
            fontWeight: 500,
            lineHeight: 22.21,
            borderWidth: 1,
            borderColor: '#33CC32',
            borderRadius: 4,
            paddingHorizontal: 16,
            paddingVertical: 0.19,
            marginTop: 16,
            marginBottom: 10.19,
          }}>
          {leaveType.toUpperCase()}
        </Text>
        <Text
          numberOfLines={2}
          style={[
            styles.font(400),
            styles.size(10),
            {
              color: '#414141',
              fontSize: 8,
              fontWeight: 600,
              lineHeight: 13,
              paddingHorizontal: 8,
            },
          ]}>
          Applied On {'\n'}
          {appliedOn}
        </Text>
      </View>
      {data?.map(e => (
        <View
          style={[
            styles.row,
            styles.alignItemsCenter,
            {justifyContent: 'space-between'},
            e.rowStyle,
          ]}>
          <Text
            style={[
              styles.font(400),
              styles.size(12),
              {
                flex: 1,
                color: '#A0A0A0',
                fontSize: 12,
                fontWeight: 400,
                lineHeight: 18,
                paddingHorizontal: 15,
              },
              e.headingStyle,
            ]}>
            {e.heading}
          </Text>
          <Text
            style={[
              styles.font(400),
              styles.size(10),
              {
                color: '#414141',
                flex: 1,
                fontSize: 12,
                fontWeight: 600,
                lineHeight: 13,
                paddingHorizontal: 15,
              },
              e.style,
            ]}>
            {e.value}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default LeaveCard;
