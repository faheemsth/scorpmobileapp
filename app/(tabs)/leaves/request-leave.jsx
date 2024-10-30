import {View, Text, ScrollView, Pressable, Alert, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../../components/theme';
import SearchableDropdown from '../../components/searchable-dropdown';
import InputField from '../../components/input-field';
import datalayer from '../../../datalayer/datalayer';
import DateRangePicker from '../../components/date-range-picker';
import CalendarIcon from '../../../assets/icons/calendar.svg';
import Btn from '../../components/btn';
import {router} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';

const RequestLeave = () => {
  const [user, setUser] = useState();
  const [leaveTypes, setLeaveTypes] = useState();
  const [selectedLeaveTypeId, setSelectedLeaveTypeId] = useState();
  const [reason, setReason] = useState();
  const [isModalVisible, setIsModalVisible] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  onDateRangeModalClose = () => {
    setIsModalVisible(false);
  };

  dateToDdMmYyyy = (date = new Date()) =>
    `${(date.getDate() < 10 ? '0' : '') + date.getDate()}/${
      (date.getMonth() < 9 ? '0' : '') + String(date.getMonth() + 1)
    }/${date.getFullYear()}`;

  onDateRangeModalSubmit = ({startDate, endDate}) => {
    const now = new Date();
    if (startDate < now) {
      Alert.alert('Error', 'Requesting leave in previous dates is not allowed');
      return;
    }
    if (!!!endDate) endDate = startDate;
    setStartDate(startDate);
    setEndDate(endDate);
    onDateRangeModalClose();
  };

  useEffect(() => {
    fetchAsync = async () => {
      const u = await datalayer.authLayer.getUserAsync();
      const lt = (await datalayer.leavesLayer.getLeavesTypesAndAllowed())?.[
        'leaveType'
      ].map(item => {
        return {id: item?.['id'], name: item?.['title']};
      });

      console.log('lt', lt);

      setUser(u);
      setLeaveTypes(lt);
      setSelectedLeaveTypeId(lt?.[0]?.id);
    };
    fetchAsync().catch(e => Alert.alert('Error', e?.['message']));
  }, []);

  onLeaveTypeSelected = item => {
    setSelectedLeaveTypeId(item.id);
  };

  submitRequest = async () => {
    if (!!!reason) Alert.alert('Error', 'reason must be provided');
    const req = await datalayer.leavesLayer
      .submitRequest({
        brand_id: user?.['brand_id'],
        region_id: user?.['region_id'],
        branch_id: user?.['branch_id'],
        leave_type_id: selectedLeaveTypeId,
        leave_reason: reason,
        start_date: `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`,
        end_date: `${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDate()}`,
      })
      .catch(e => Alert.alert('Error', e?.['message']));
    console.log('req', req);
    if (req) router.dismiss();
  };

  return (
    <View style={{margin: 14,gap:100,}}>
      <View style={{gap:10,}}>
      <View style={{gap:1,}}>
        <Text
          style={{
            
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 24,
            color: '#414141',
          }}>
          Leave Type
        </Text>
        <View
          style={{
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#A0A0A0',
            
          }}>
          <Picker
            onValueChange={(val, index) => {
              console.log('selected value is', val);
              setSelectedLeaveTypeId(val);
            }}
            selectedValue={selectedLeaveTypeId}
            style={{
              color: '#A0A0A0',
              fontSize: 14,
              fontWeight: 400,
            }}
            mode="dropdown">
            {leaveTypes?.map(lt => {
              console.log('leaveTypes is', lt);
              return (
                <Picker.Item
                  key={lt?.['id']}
                  label={lt?.['name']}
                  value={lt?.['id']}
                />
              );
            })}
          </Picker>
        </View>
      </View>

      <View style={{flexDirection: 'row',justifyContent:"space-between", padding: 0, }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 8,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#A0A0A0',
            paddingLeft: 15,
          }}
          onPress={() => setIsModalVisible(true)}>
          <View>
            <Text
              style={{
                color: '#A0A0A0',
                fontSize: 14,
                paddingBottom: 3,
                paddingTop: 3,
              }}>
              {dateToDdMmYyyy(startDate)}
            </Text>
          </View>
          <CalendarIcon
            style={{
              color: '#000',
              paddingLeft: 37,
              width: 13.33,
              height: 15,
              border: 4,
              marginTop: 6,
            }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 8,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#A0A0A0',
            marginHorizontal: 10,
            paddingLeft: 15,
          }}
          onPress={() => setIsModalVisible(true)}>
          <View>
            <Text
              style={{
                color: '#A0A0A0',
                fontSize: 14,
                paddingBottom: 3,
                paddingTop: 3,
              }}>
              {dateToDdMmYyyy(startDate)}
            </Text>
          </View>
          <CalendarIcon
            style={{
              color: '#000',
              paddingLeft: 37,
              width: 13.33,
              height: 15,
              border: 4,
              marginTop: 6,
            }}
          />
        </View>
        <DateRangePicker
          isVisible={isModalVisible}
          onClose={onDateRangeModalClose}
          onSelectDateRange={onDateRangeModalSubmit}
          onSelectSingleDate={onDateRangeModalSubmit}
        />
      </View>

      <View>
        <Text
          style={{
            paddingLeft: 15,
            fontWeight: 500,
            fontSize: 16,
            lineHeight: 24,
            color: '#DC3545',
            marginBottom: 10,
          }}>
          Reason for leave
        </Text>
        <InputField
          placeholder={''}
          value={reason}
          onChange={setReason}
          multiline={true}
          style={{height: 130, borderColor: '#DC3545', borderRadius: 6}}
        />
      </View>

      <Text style={{fontSize: 16, fontWeight: 500,}}>
        Is it a Compensatory Off?
      </Text>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 1000,
            borderColor: '#A0A0A0',
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
            alignItems: 'center',
            alignContent: 'center',
            flexGrow: 0,
            flexShrink: 1,
          }}>
          <Text
            style={{
              backgroundColor: '#FFF2F2',
              color: '#DC3545',
              padding: 13.5,
              borderRightWidth: 1,
              borderColor: '#A0A0A0',
              width:104,
              textAlign:"center",
            }}>
            No
          </Text>

          <Text
            style={{
              backgroundColor: '#ffffff',
              color: '#33CC32',
              width:104,
              padding: 13.5,
              borderEndWidth: 1,
              borderColor: '#A0A0A0',
              textAlign:"center",
            }}>
            Yes
          </Text>
        </View>
      </View>
      </View>
      <View>
      <Btn style={{}} title="Submit" handleClick={submitRequest} />
      </View>
    </View>
  );
};

export default RequestLeave;
