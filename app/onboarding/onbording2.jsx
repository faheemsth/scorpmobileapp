
import {View, Text, ScrollView, Pressable, Image} from 'react-native';
import React, {useEffect} from 'react';
import BGCimg from '../../assets/icons/BGCimg.svg';
import DOTicon from '../../assets/icons/DOTicon.svg';
import WLimg from '../../assets/icons/WLimg.svg';
import Btn from '../components/btn';
import {useNavigation} from 'expo-router';
import {Positions} from 'react-native-calendars/src/expandableCalendar';
const Onbording1 = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({headerShown: false});
  }, []);
  return (
    <ScrollView contentContainerStyle={{backgroundColor: '#7647EB'}}>
      <View
        style={{marginTop: 130.86, alignSelf: 'center', marginBottom: 82.3}}>
        <View style={{marginBottom: -190}}>
          <BGCimg style={{Positions: 'absolute'}}></BGCimg>
        </View>
        <WLimg style={{justifyContent: 'Center'}}></WLimg>
      </View>
      <View>
        <DOTicon
          style={{
            width: 30,
            height: 5,
            top: 389.5,
            left: 173,
            gap: 4,
            opacity: 0,
          }}></DOTicon>
      </View>

      <View style={{gap: 20, marginLeft: 14}}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 32,
            color: '#FFFFFF',
          }}>
          Organised record of your team statistics.
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'poppins-400',
            lineHeight: 21,
            fontWeight: 400,
            color: '#E2D8FB',
          }}>
          Track all the members of your team, no matter how big or small they 
          are. Have a detailed record of all time attendance records taken, all
          on your device.
        </Text>
      </View>

      <Pressable
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 96,
          marginBottom: 39.67,
        }}>
        <View
          style={{
            padding: 23,
            backgroundColor: '#fff',
            borderRadius: 1000,
            overflow: 'hidden',
          }}>
          <Image
            style={{width: 24, height: 24}}
            source={require('../../assets/Arroclk.png')}
          />
        </View>
      </Pressable>
    </ScrollView>
  );
};
export default Onbording1;
