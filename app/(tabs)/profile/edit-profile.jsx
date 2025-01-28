import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import EditProfileImgIcon from '../../../assets/icons/edit-profile-img.svg';
import datalayer, {useUser} from '../../../datalayer/datalayer';
import InputField from '../../components/input-field';
import UserIcon from '../../../assets/icons/profile-list-item-icon.svg';
import EmailIcon from '../../../assets/icons/email.svg';
import PhoneIcon from '../../../assets/icons/phone.svg';
import DesignationIcon from '../../../assets/icons/designation.svg';
import LocationIcon from '../../../assets/icons/location.svg';
import Btn from '../../components/btn';
import {router} from 'expo-router';

const EditProfile = () => {
  const user = useUser();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [designation, setDesignation] = useState('');

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setDesignation(user?.type);
  }, [user]);

  return (
    <View style={{gap: 5, padding: 15}}>
      <View style={{alignItems: 'center', margin: 29}}>
        <EditProfileImgIcon height={0} />
      </View>
      <InputField
        leading={<UserIcon />}
        placeholder={'name...'.toUpperCase()}
        value={name}
        onChange={setName}
      />
      <InputField
        leading={<PhoneIcon />}
        placeholder={'phone...'.toUpperCase()}
        value={phone}
        onChange={setPhone}
      />
      <InputField
        readonly={true}
        leading={<DesignationIcon />}
        placeholder={'designation...'.toUpperCase()}
        style={{backgroundColor: "#e4e4e4"}}
        value={designation}
      />
      <InputField
        leading={<EmailIcon />}
        placeholder={'email...'.toUpperCase()}
        value={email}
        onChange={setEmail}
      />
      <InputField
        leading={<LocationIcon />}
        placeholder={'address...'.toUpperCase()}
        value={address}
        onChange={setAddress}
      />
      <Btn
        handleClick={() => {
          datalayer.authLayer
            .editProfile({
              email,
              name,
              phone,
              address,
            })
            .then(e => {
              if (e.success && router.canDismiss()) router.dismiss();
            });
        }}
        style={{marginHorizontal: 12, marginVertical: 29}}
        title="Save Changes"
      />
    </View>
  );
};

export default EditProfile;
