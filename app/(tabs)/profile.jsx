import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  Pressable,
  AlertButton,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import styles from '../components/theme';
import datalayer from '../../datalayer/datalayer';
import InputField from '../components/input-field';
import UserIcon from '../../assets/icons/profile.svg';
import EmailIcon from '../../assets/icons/email.svg';
import PowerIcon from '../../assets/icons/power.svg';
import {router} from 'expo-router';

const Profile = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    fetchAsync = async () => {
      const u = await datalayer.authLayer.getUserAsync();

      setUser(u);
    };
    fetchAsync().catch(e => Alert.alert('Error', e?.['message']));
  }, []);

  logoutPressed = () => {
    Alert.alert('Warning', 'Are you sure you want to logout?', [
      {text: 'No', style: 'cancel'},
      {text: "Yes", onPress: () => {
        datalayer.authLayer.logOut().catch(console.error);
        router.replace('/onboarding/hello');
      }}
    ]);
  };

  return (
    <ScrollView contentContainerStyle={{flex: 1, gap: 47 + 20}}>
      <LinearGradient
        colors={['#D4E5F2', '#7647EB']}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          alignContent: 'center',
          gap: 10,
          height: 137,
        }}>
        <View style={{height: 35}} />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={[styles.font(500), styles.size(24)]}>Profile</Text>
          <Pressable
            onPress={logoutPressed}
            style={{position: 'absolute', right: 15, top: -19.5}}>
            <PowerIcon width={32} />
          </Pressable>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: -46.5,
            backgroundColor: 'white',
            borderRadius: 1000,
          }}>
          {!!user?.['avatar'] ? (
            <Image
              fadeDuration={1000}
              source={{
                height: 93,
                width: 93,
                uri: user?.['avatar'],
              }}
              style={{
                borderRadius: 400,
                borderColor: 'white',
                borderWidth: 2,
                marginTop: 12,
                position: 'absolute',
              }}
            />
          ) : (
            <UserIcon height={93} width={93} style={{color: '#666'}} />
          )}
        </View>
        <View style={{height: 35}} />
      </LinearGradient>
      <View style={{padding: 20, gap: 20}}>
        <View style={{gap: 5}}>
          <Text styles={[styles.font(600), {marginLeft: 10}]}>Name</Text>
          <InputField
            style={{
              marginHorizontal: 0,
              backgroundColor: '#0000001A',
              fieldStyle: {color: '#00000080'},
            }}
            readonly={true}
            value={user?.['name']}
          />
        </View>
        <View style={{gap: 5}}>
          <Text styles={[styles.font(600), {marginLeft: 10}]}>Email</Text>
          <InputField
            leading={<EmailIcon />}
            style={{
              marginHorizontal: 0,
              backgroundColor: '#0000001A',
              fieldStyle: {color: '#00000080'},
            }}
            readonly={true}
            value={user?.['email']}
          />
        </View>
        <View style={{gap: 5}}>
          <Text styles={[styles.font(600), {marginLeft: 10}]}>
            Phone Number
          </Text>
          <InputField
            style={{
              marginHorizontal: 0,
              backgroundColor: '#0000001A',
              fieldStyle: {color: '#00000080'},
            }}
            readonly={true}
            value={user?.['phone']}
          />
        </View>
        <View style={{gap: 5}}>
          <Text styles={[styles.font(600), {marginLeft: 10}]}>Designation</Text>
          <InputField
            style={{
              marginHorizontal: 0,
              backgroundColor: '#0000001A',
              fieldStyle: {color: '#00000080'},
            }}
            readonly={true}
            value={user?.['type']}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
