import {View, Text, ScrollView, Pressable, Image} from 'react-native';
import React, {useEffect} from 'react';
import BGCimg from '../../assets/icons/BGCimg.svg';
import Wmenimg from '../../assets/icons/Wmenimg.svg';
import {router, useNavigation} from 'expo-router';

const Onbording1 = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({headerShown: false});
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: '#7647EB',
        flex: 1,
        justifyContent: 'space-around',
      }}>
      <View
        style={{
          alignSelf: 'center',
          position: 'relative',
          marginVertical: 50,
          paddingVertical: 50,
          gap: 50,
          alignItems: 'center',

        }}>
        <BGCimg style={{position: 'absolute'}}></BGCimg>
        <Wmenimg style={{justifyContent: 'Center'}}></Wmenimg>
        <View style={{gap: 20,}}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'poppins-700',
              lineHeight: 32,
              color: '#FFFFFF',
            }}>
            Keep up with your team’s attendance
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'poppins-400',
              lineHeight: 21,
              fontWeight: 400,
              color: '#E2D8FB',
            }}>
            Easily take attendance of your team, no matter how big or small
            there are. Take this attendance manually, automatically or set a
            recurring attendance method.
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() => {
          router.navigate('/onboarding/onbording2');
        }}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
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
