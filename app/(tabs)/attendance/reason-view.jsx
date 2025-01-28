import {View, Text, Modal, Pressable} from 'react-native';
import React from 'react';
import Cross from '../../../assets/icons/cross.svg';

const ReasonView = ({onClose, reason}) => {
  return (
    <Modal transparent={true} animated={true} animationType='slide'>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          flex: 1,
          height: '100%',
          justifyContent: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            overflow: 'hidden',
            position: 'relative',
          }}>
          <Pressable
            onPress={onClose}
            style={{position: 'absolute', zIndex: 1, right: 8, top: 5}}>
            <Cross style={{color: '#ffffff'}} />
          </Pressable>
          <Text
            style={{
              backgroundColor: '#DC3545',
              paddingVertical: 16.93,
              paddingHorizontal: 51,
              color: '#ffffff',
              fontSize: 16,
            }}>
            Reason For Early Clock-Out
          </Text>
          <Text
            style={{paddingHorizontal: 20, paddingVertical: 32, fontSize: 12}}>
            {reason}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ReasonView;
