import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import styles from '../theme';
import UserIcon from '../../../assets/icons/profile.svg';

const LeaveCard = ({
  uName = 'No Name...',
  data = [
    {
      heading: 'heading',
      value: 'value',
      style: StyleSheet.create({style: {}}).style,
      headingStyle: StyleSheet.create({style: {}}).style,
      rowStyle: StyleSheet.create({style: {}}).style,
    },
  ],
  url = 'https://s3-alpha-sig.figma.com/img/1097/3fce/926bc64490c18217630a6c74affe3172?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aMAoK8gJb54DRLNClhEt8YpqwjHcpF8D2u8t3kXfEOoXoJDsV3jOgG0VyW22ICGEDOdrEEGyURcAqwoKdmKG1WEAc~OwuOC8fSwKbY26HnBde64zxOU49Df0U1FNCVrAVyb1b205tFXJHqgHC~wmvUytSId3vrmsHzEOClI5OLSILmm5nyQPHq80XGk2UAqaUlO0jJRhJoFQ1eWVihPJbnnFGefHtbKZrUaIGZVT6bXEiMOg9cDrTC8SmkPMkgZBtDsICmYw2Qwax8WShjtoNwCtwPoYNlqiHd9lnMPO7zh-m0Za8n5JeQAtaAg4bMiGspR4QdFxdsTw7WKlLq1QDg__',
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
        },
        styles.gap(5), 
      ]}>
      <Text
        style={{
          color: '#33CC32',
          fontSize: 15.21,
          fontWeight: 500,
          lineHeight: 22.21,
          borderWidth: 1,
          borderColor: '#33CC32',
          marginLeft:15,
          marginTop:16,
          paddingLeft:16,
          paddingRight:8.21,
          width:120,
          paddingVertical: 0.19,
          marginTop:16,
          marginBottom: 10.19,
        }}>
        Sick leave
      </Text>
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
0;
