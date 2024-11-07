import {View, Text, ScrollView, Pressable, Image} from 'react-native';
import React, {useEffect} from 'react';
import BGCimg from '../../assets/icons/BGCimg.svg';
import WLimg from '../../assets/icons/WLimg.svg';
import {router, useNavigation} from 'expo-router';
import datalayer from '../../datalayer/datalayer';
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
        <WLimg style={{justifyContent: 'Center'}}></WLimg>
        <View style={{gap: 20, }}>
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
            are. Have a detailed record of all time attendance records taken,
            all on your device.
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() => {
          datalayer.storeData(datalayer.KEYS.hasSeenOnboarding, true);
          router.replace('/onboarding/hello');
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
