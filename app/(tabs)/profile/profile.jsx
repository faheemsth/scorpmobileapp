import {View, Text, ScrollView, Image, Alert, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import datalayer from '../../../datalayer/datalayer';
import UserIcon from '../../../assets/icons/profile.svg';
import TermsAndConditionIcon from '../../../assets/icons/terms_and_conditions.svg';
import PrivacyPolicyIcon from '../../../assets/icons/privacy_policy.svg';
import Chevron from '../../../assets/icons/chevron.svg';
import LogoutIcon from '../../../assets/icons/logout_icon.svg';
import ProfileListItemIcon from '../../../assets/icons/profile-list-item-icon.svg';

import {router} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import Btn from '../../components/btn';
import * as WebBrowser from 'expo-web-browser';

const Profile = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    fetchAsync = async () => {
      const u = await datalayer.authLayer.getUserAsync();
      setUser(u);
    };
    fetchAsync().catch(e => Alert.alert('Error', e?.['message']));
  }, []);

  const openBrowser = async link => {
    if (typeof link === 'string')
      await WebBrowser.openBrowserAsync(link).catch(console.error);
  };

  const myProfileClicked = () => {
    router.navigate('/profile/my-profile');
  };
  const editProfileClicked = () => {
    console.log('navigating to edit profile');
    router.navigate('/profile/edit-profile');
  };

  logoutPressed = () => {
    Alert.alert('Warning', 'Are you sure you want to logout?', [
      {text: 'No', style: 'cancel'},
      {
        text: 'Yes',
        onPress: () => {
          datalayer.authLayer.logOut().catch(console.error);
          router.replace('/onboarding/hello');
        },
      },
    ]);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'stretch',
        fontFamily: 'poppins-400',
        gap: 46,
      }}>
      <Text
        style={{
          fontFamily: 'poppins-500',
          color: '#7647EB',
          fontSize: 20,
          textAlign: 'center',
        }}>
        Profile
      </Text>
      
      <ScrollView
        contentContainerStyle={{flex: 1, alignItems: 'center', gap: 48}}>
        <View style={{alignItems: 'center', gap: 10}}>
          {user?.['avatar'] ? (
            <Image
              
              fadeDuration={1000}
              source={{
                height: 109,
                width: 109,
                uri: user?.['avatar'],
              }}
              style={{
                borderRadius: 400,
                borderColor: '#7647EB33',
                borderWidth: 2,
                marginTop: 12,
              }}
            />
          ) : (
            <UserIcon
              width={109}
              height={109}
              style={{color: '#D9D9D9', marginTop: 12}}
            />
          )}



         

          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: '#414141',
                fontSize: 20,
                fontFamily: 'poppins-600',
              }}>
              {user?.name}
            </Text>
            <Text
              style={{
                color: '#414141',
                fontSize: 16,
                fontFamily: 'poppins-400',
                lineHeight: 18,
              }}>
              {user?.type}
            </Text>
          </View>
          <Btn
            handleClick={editProfileClicked}
            title="Edit Profile"
            style={{marginTop: 11, paddingHorizontal: 57}}
          />
        </View>

        <View style={{flexDirection: 'row', paddingHorizontal: 15, gap: 15}}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'stretch',
              flex: 1,
              gap: 15,
            }}>
            <ProfileListItem
              text="My Profile"
              leading={<ProfileListItemIcon />}
              trailing={<Chevron style={{color: '#414141'}} />}
              onClick={myProfileClicked}
            />
            <ProfileListItem
              text="Term & Condition"
              leading={<TermsAndConditionIcon />}
              trailing={<Chevron style={{color: '#414141'}} />}
              onClick={() => {
                openBrowser('https://erp.convosoft.com/terms');
              }}
            />
            <ProfileListItem
              text="Privacy Policy"
              leading={<PrivacyPolicyIcon />}
              trailing={<Chevron style={{color: '#414141'}} />}
              onClick={() => {
                openBrowser('https://erp.convosoft.com/privacy');
              }}
            />
            <ProfileListItem
              text="Log out"
              leading={<LogoutIcon style={{marginEnd: 4}} />}
              onClick={() => {
                logoutPressed();
              }}
              color={'#DC3545'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export function ProfileListItem({leading, text, trailing, onClick, color}) {
  return (
    <Pressable
      onPress={onClick}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        {leading}
        <Text
          style={{
            fontFamily: 'poppins-500',
            fontSize: 16,
            color: color ?? '#414141',
          }}>
          {text}
        </Text>
      </View>
      {trailing}
    </Pressable>
  );
}

export default Profile;
