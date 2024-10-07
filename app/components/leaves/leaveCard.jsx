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
    },
  ],
  url = 'https://s3-alpha-sig.figma.com/img/1097/3fce/926bc64490c18217630a6c74affe3172?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aMAoK8gJb54DRLNClhEt8YpqwjHcpF8D2u8t3kXfEOoXoJDsV3jOgG0VyW22ICGEDOdrEEGyURcAqwoKdmKG1WEAc~OwuOC8fSwKbY26HnBde64zxOU49Df0U1FNCVrAVyb1b205tFXJHqgHC~wmvUytSId3vrmsHzEOClI5OLSILmm5nyQPHq80XGk2UAqaUlO0jJRhJoFQ1eWVihPJbnnFGefHtbKZrUaIGZVT6bXEiMOg9cDrTC8SmkPMkgZBtDsICmYw2Qwax8WShjtoNwCtwPoYNlqiHd9lnMPO7zh-m0Za8n5JeQAtaAg4bMiGspR4QdFxdsTw7WKlLq1QDg__',
}) => {
  return (
    <View
      style={[
        styles.ph(12),
        styles.pv(12),
        styles.bg('#fff'),
        {borderRadius: 5},
        styles.gap(5),
      ]}>
      <View style={[styles.row, styles.gap(10), styles.alignItemsCenter]}>
        {!!url ? (
          <Image
            style={{
              width: 27,
              height: 27,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: 'black',
            }}
            source={{uri: url}}
          />
        ) : (
          <UserIcon width={27} height={27} style={{color: '#D9D9D9'}} />
        )}
        <Text style={[styles.font(400), styles.size(14)]}>{uName}</Text>
      </View>
      {data?.map(e => (
        <View
          style={[
            styles.row,
            styles.alignItemsCenter,
            {justifyContent: 'flex-start'},
          ]}>
          <Text style={[styles.font(400), styles.size(12), {flex: 0.8}]}>
            {e.heading}
          </Text>
          <View style={{flex: 1}}>
            <Text style={[styles.font(400), styles.size(10), e.style]}>
              {e.value}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default LeaveCard;
0;
