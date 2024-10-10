import {View, Text} from 'react-native';
import React from 'react';
import Bottomsheet from '../../components/bottom-sheet';

const ReasonView = ({onClose, reason}) => {
  return (
    <Bottomsheet
      onClose={onClose}
      handleComponent={() => (
        <Text
          style={{
            padding: 15,
            width: '100%',
            backgroundColor: '#167BC4',
            color: '#fff',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}>
          Reason For Early Clock Out
        </Text>
      )}
      style={{
        padding: 0,
        contentContainer: {padding: 0},
        elevation: 4,
      }}>
        <Text style={{padding: 20, width: "100%"}}>{reason}</Text>
      </Bottomsheet>
  );
};

export default ReasonView;
