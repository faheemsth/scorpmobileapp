import {View, Text, ScrollView, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import styles from '../components/theme';
import datalayer from '../../datalayer/datalayer';
import InputField from '../components/input-field';
import UserIcon from '../../assets/icons/profile.svg';

const Profile = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    fetchAsync = async () => {
      const u = await datalayer.authLayer.getUserAsync();

      setUser(u);
    };
    fetchAsync().catch(e => Alert.alert('Error', e?.['message']));
  }, []);

  return (
    <ScrollView contentContainerStyle={{flex: 1, gap: 10}}>
      <LinearGradient
        colors={['#D4E5F2', '#167BC4']}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          flexDirection: 'column',
          alignItems: 'center',
          alignContent: 'center',
          gap: 10,
        }}>
        <View style={{height: 35}} />
        <Text style={[styles.font(500), styles.size(24)]}>Profile</Text>
        {!!user?.['avatar'] ? (
          <Image
            fadeDuration={1000}
            source={{
              height: 135,
              width: 135,
              uri: user?.['avatar'],
            }}
            style={{
              borderRadius: 400,
              borderColor: 'white',
              borderWidth: 2,
              marginTop: 12,
            }}
          />
        ) : (
          <UserIcon height={135} width={135} style={{color: '#D9D9D9'}} />
        )}
        <View style={{height: 35}} />
      </LinearGradient>
      <View style={{padding: 20}}>
        <View>
          <Text styles={[styles.font(400), {marginLeft: 10}]}>Name</Text>
          <InputField
            style={{marginHorizontal: 0}}
            readonly={true}
            value={user?.['name']}
          />
        </View>
        <View>
          <Text styles={[styles.font(400), {marginLeft: 10}]}>Email</Text>
          <InputField
            style={{marginHorizontal: 0}}
            readonly={true}
            value={user?.['email']}
          />
        </View>
        <View>
          <Text styles={[styles.font(400), {marginLeft: 10}]}>
            Phone Number
          </Text>
          <InputField
            style={{marginHorizontal: 0}}
            readonly={true}
            value={user?.['phone']}
          />
        </View>
        <View>
          <Text styles={[styles.font(400), {marginLeft: 10}]}>Designation</Text>
          <InputField
            style={{marginHorizontal: 0}}
            readonly={true}
            value={user?.['type']}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
