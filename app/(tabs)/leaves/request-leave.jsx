import {View, Text, ScrollView, Pressable, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputField from '../../components/input-field';
import datalayer from '../../../datalayer/datalayer';
import DateRangePicker from '../../components/date-range-picker';
import CalendarIcon from '../../../assets/icons/calendar.svg';
import Btn from '../../components/btn';
import {router} from 'expo-router';
import {Picker} from '@react-native-picker/picker';
import {TextInput} from 'react-native';
const RequestLeave = () => {
  const [user, setUser] = useState();
  const [leaveTypes, setLeaveTypes] = useState();
  const [selectedLeaveTypeId, setSelectedLeaveTypeId] = useState();
  const [reason, setReason] = useState();
  const [isModalVisible, setIsModalVisible] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isCompensatory, setIsCompensatory] = useState(0);

  onDateRangeModalClose = () => {
    setIsModalVisible(false);
  };

  dateToDdMmYyyy = (date = new Date()) =>
    `${(date.getDate() < 10 ? '0' : '') + date.getDate()}/${
      (date.getMonth() < 9 ? '0' : '') + String(date.getMonth() + 1)
    }/${date.getFullYear()}`;

  onDateRangeModalSubmit = ({startDate, endDate}) => {
    console.log('start date ' + startDate + 'end date ' + endDate);
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
        start_date: `${startDate.getFullYear()}-${
          startDate.getMonth() + 1
        }-${startDate.getDate()}`,
        end_date: `${endDate.getFullYear()}-${
          endDate.getMonth() + 1
        }-${endDate.getDate()}`,
        is_compensatory: isCompensatory,
      })
      .catch(e => Alert.alert('Error', e?.['message']));
    console.log('req', req);
    if (req) router.dismiss();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 14,
        gap: 100,
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View style={{gap: 10}}>
        <View style={{gap: 1}}>
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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10,
            padding: 0,
          }}>
          <Pressable
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
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
          </Pressable>
          <Pressable
            style={{
              flex: 1,
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
                {dateToDdMmYyyy(endDate)}
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
          </Pressable>
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
              fontWeight: 500,
              fontSize: 16,
              lineHeight: 24,
              color: '#DC3545',
              marginBottom: 10,
            }}>
            Reason for leave
          </Text>

          <TextInput
            placeholder=""
            value={reason}
            onChangeText={setReason}
            multiline={true}
            numberOfLines={5}
            style={{
              borderColor: '#DC3545',
              borderWidth: 1,
              borderRadius: 6,
              padding: 10,
              textAlignVertical: 'top',
            }}
          />
        </View>

        <Text style={{fontSize: 16, fontWeight: 500}}>
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
            <Pressable onPress={() => setIsCompensatory(0)}>
              <Text
                style={{
                  backgroundColor:
                    isCompensatory == 0 ? '#DC354511' : '#FFFFFF',
                  color: '#DC3545',
                  padding: 13.5,
                  borderRightWidth: 1,
                  borderColor: '#A0A0A0',
                  width: 104,
                  textAlign: 'center',
                }}>
                No
              </Text>
            </Pressable>

            <Pressable onPress={() => setIsCompensatory(1)}>
              <Text
                style={{
                  backgroundColor:
                    isCompensatory == 1 ? '#33CC3211' : '#ffffff',
                  color: '#33CC32',
                  width: 104,
                  padding: 13.5,
                  borderEndWidth: 1,
                  borderColor: '#A0A0A0',
                  textAlign: 'center',
                }}>
                Yes
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Btn style={{}} title="Submit" handleClick={submitRequest} />
    </ScrollView>
  );
};

export default RequestLeave;