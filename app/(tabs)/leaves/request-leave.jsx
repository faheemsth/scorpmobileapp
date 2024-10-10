import {View, Text, ScrollView, Pressable, Alert} from 'react-native';
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

  onDateRangeModalSubmit = ({startDate, endDate}) => {
    const now = new Date()
    console.log("start date is", startDate, now)
    if (startDate<now) {
      Alert.alert("Error", "Requesting leave in previous dates is not allowed")
      return
    }
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
    const req = await datalayer.leavesLayer.submitRequest({
      brand_id: user?.['brand_id'],
      region_id: user?.['region_id'],
      branch_id: user?.['branch_id'],
      leave_type_id: selectedLeaveTypeId,
      leave_reason: reason,
      start_date: `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`,
      end_date: `${endDate.getFullYear()}-${endDate.getMonth()}-${endDate.getDate()}`,
    });
    console.log('req', req);
    if (req) router.dismiss();
  };

  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: 332,
          borderRadius: 10,
          backgroundColor: '#fff',
        }}>
        <ScrollView
          contentContainerStyle={[
            styles.column,
            styles.alignItemsCenter,
            styles.justifyContentCenter,
            {
              flexDirection: 'column',
              padding: 20,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
            },
          ]}>
          <View style={{width: 280, height: 70}}>
            <Text style={{paddingLeft: 10}}>Leave Type</Text>
            <Picker
              onValueChange={(val, index) => {
                console.log("selected value is", val)
                setSelectedLeaveTypeId(val);
              }}
              selectedValue={selectedLeaveTypeId}
              mode='dropdown'
              >
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

          <View style={{width: 280}}>
            <Text style={{paddingLeft: 10}}>Select Duration</Text>

            <Pressable
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 8,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#167BC4',
                marginHorizontal: 10,
              }}
              onPress={() => setIsModalVisible(true)}>
              <Text>
                {startDate?.toDateString()?.substring(8) +
                  ' - ' +
                  endDate?.toDateString()?.substring(8)}
              </Text>
              <CalendarIcon style={{color: '#000'}} />
            </Pressable>
            <DateRangePicker
              isVisible={isModalVisible}
              onClose={onDateRangeModalClose}
              onSelectDateRange={onDateRangeModalSubmit}
            />
          </View>

          <View style={{width: 280}}>
            <Text style={{paddingLeft: 10}}>Reason</Text>
            <InputField
              placeholder={'Type your reason'}
              value={reason}
              onChange={setReason}
              multiline={true}
              style={{height: 130}}
            />
          </View>
          <Btn title="Submit" handleClick={submitRequest} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RequestLeave;
