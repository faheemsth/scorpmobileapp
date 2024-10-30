import {View, Text, Alert, Modal} from 'react-native';
import React, {useState} from 'react';
import Bottomsheet from '../../components/bottom-sheet';
import InputField from '../../components/input-field';
import Btn from '../../components/btn';
import datalayer from '../../../datalayer/datalayer';
import {Line} from 'react-native-svg';

const WriteEarlyCheckoutReason = ({onClose}) => {
  const [reason, setReason] = useState('');
  const clockOut = async () => {
    const done = await datalayer.attendanceLayer
      .clockOut(reason)
      .catch(e => Alert.alert('Error', e?.['message']));
    console.log('clockout inside reason', done);
    onClose?.();
  };

  return (
    <Modal transparent={true}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
          backgroundColor: '#00000033',
        }}>
        <View
          style={{
            backgroundColor: '#ffffff',
            margin: 10,
            borderRadius: 10,
            overflow: 'hidden',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              backgroundColor: '#DC3545',
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: 600,

              height: 62,
              lineHeight: 20,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            Reason For Early Clock-Out
          </Text>
          <InputField
            style={{margin: 12, marginTop: 34, marginBottom: 0}}
            lines={5}
            multiline={true}
            value={reason}
            onChange={setReason}
            placeholder={'Write Your Reason For Early Clock-Out'}></InputField>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              alignSelf: 'center',
              paddingVertical: 30,
            }}>
            <Btn
              style={{
                borderColor: '#DC3545',
                borderWidth: 1,
                elevation: 0,
                alignSelf: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 5,
                color: '#DC3545',
                fontSize: 16,
                fontWeight: 500,
                lineHeight: 23,
                textAlign: 'center',
                backgroundColor: '#fff',
                gap: 10,
              }}
              handleClick={onClose}
              title={'Cancel'}
            />
            <Btn
              style={{
                borderColor: '#DC3545',
                borderWidth: 1,
                elevation: 0,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 5,
                color: '#ffffff',
                fontSize: 16,
                fontWeight: 500,
                textAlign: 'center',
                backgroundColor: '#DC3545',
              }}
              handleClick={clockOut}
              title={'Clock-Out'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );

};

export default WriteEarlyCheckoutReason;
