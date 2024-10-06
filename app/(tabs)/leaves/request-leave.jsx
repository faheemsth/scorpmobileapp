import {View, Text, ScrollView, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../../components/theme';
import SearchableDropdown from '../../components/searchable-dropdown';
import InputField from '../../components/input-field';
import datalayer from '../../../datalayer/datalayer';
import DateRangePicker from '../../components/date-range-picker';
import CalendarIcon from '../../../assets/icons/calendar.svg';
import Btn from '../../components/btn';
import {router} from 'expo-router';

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
    fetchAsync().catch(console.error);
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
    if (req) router.back();
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.column,
        styles.alignItemsCenter,
        styles.justifyContentCenter,
        {flex: 1},
        styles.screenBg,
        styles.pv(100),
      ]}>
      <View
        style={{
          width: 332,
          borderRadius: 10,
          backgroundColor: '#fff',
          flexDirection: 'column',
          padding: 20,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20
        }}>
        <View style={{width: 280}}>
          <Text style={{paddingLeft: 10}}>Name</Text>
          <InputField
            placeholder={'Type your name'}
            readonly={true}
            value={user?.['name']}
            style={{margin: 0}}
          />
        </View>

        <View style={{width: 280, height: 70}}>
          <Text style={{paddingLeft: 10}}>Leave Type</Text>
          <SearchableDropdown
            placeholder={'Type your Leave Type'}
            onItemSelected={onLeaveTypeSelected}
            data={leaveTypes}
            restrictToList={true}
          />
        </View>

        <View style={{width: 280}}>
          <Text style={{paddingLeft: 10}}>Select Duration</Text>

          <InputField
            placeholder={'Type your reason'}
            value={
              startDate?.toDateString()?.substring(8) +
              ' - ' +
              endDate?.toDateString()?.substring(8)
            }
            readonly={true}
            onChange={setReason}
            multiline={true}
            trailing={
              <Pressable onPress={() => setIsModalVisible(true)}>
                <CalendarIcon />
              </Pressable>
            }
          />
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
        <Btn
          gradientColors={['#167BC4', '#6E7072']}
          title="Submit"
          handleClick={submitRequest}
        />
      </View>
    </ScrollView>
  );
};

export default RequestLeave;
