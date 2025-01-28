import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Btn from '../../components/btn';
import InputField from '../../components/input-field';
import {router, useNavigation} from 'expo-router';
import datalayer, {useUser} from '../../../datalayer/datalayer';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateIcon from '../../../assets/icons/calendar.svg';
import ClockIcon from '../../../assets/icons/timer.svg';
import SearchableDropdown from '../../components/searchable-dropdown';
import {Picker} from '@react-native-picker/picker';
import {SafeAreaView} from 'react-native-safe-area-context';

const TaskField = ({
  label,
  readonly,
  placeholder,
  value,
  onChange,
  trailing,
  isSearchable = false,
  data = [],
  style = StyleSheet.create({style: {}}).style,
}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'flex-start',
        marginVertical: 8,
      }}>
      <Text style={{fontFamily: 'poppins-400', fontSize: 12, color: '#A0A0A0'}}>
        {label}
      </Text>
      {isSearchable ? (
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#7647EB',
            flex: 1,
          }}>
          <Picker
            onValueChange={(val, index) => {
              console.log('selected value is', data?.[index]);
              onChange(data?.[index]);
            }}
            selectedValue={value}
            mode="dropdown"
            style={{flex: 1}}>
            {data?.map(i => (
              <Picker.Item label={i?.['name']} value={i?.['id']} />
            ))}
          </Picker>
        </View>
      ) : (
        <InputField
          style={[
            {
              flex: 1,
              backgroundColor: !readonly ? '#fff' : '#0002',
              marginEnd: 0,
            },
            style,
          ]}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          trailing={trailing}
          isBottomSheet={false}
          readonly={readonly}
        />
      )}
    </View>
  );
};

const CreateTask = () => {
  const user = useUser();

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [brands, setBrands] = useState('');
  const [region, setRegion] = useState('');
  const [branch, setBranch] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [selectedTaskStatus, setSelectedTaskStatus] = useState(0);

  const [now] = useState(new Date());

  const [dueDate, setDueDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [remainderDate, setRemainderDate] = useState(new Date());
  const [remainderTime, setRemainderTime] = useState(new Date());

  const [showDueDate, setShowDueDate] = useState(false);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showRemainderDate, setShowRemainderDate] = useState(false);
  const [showRemainderTime, setShowRemainderTime] = useState(false);

  useEffect(() => {
    console.log(
      showDueDate,
      showStartDate,
      showRemainderDate,
      showRemainderTime,
    );
  }, [showDueDate, showStartDate, showRemainderDate, showRemainderTime]);

  handleDueDateClick = async () => {
    setShowDueDate(true);
    setShowStartDate(false);
    setShowRemainderDate(false);
    setShowRemainderTime(false);
  };

  handleStartDateClick = async () => {
    setShowDueDate(false);
    setShowStartDate(true);
    setShowRemainderDate(false);
    setShowRemainderTime(false);
  };

  handleRemainderDateClick = async () => {
    setShowDueDate(false);
    setShowStartDate(false);
    setShowRemainderDate(true);
    setShowRemainderTime(false);
  };

  handleRemainderTimeClick = async () => {
    setShowDueDate(false);
    setShowStartDate(false);
    setShowRemainderDate(false);
    setShowRemainderTime(true);
  };

  setDate = (value, type) => {
    console.log('setting ', type, value);
    switch (type) {
      case 'due_date':
        if (value >= now) {
          setDueDate(value);
        } else {
          Alert.alert('Error', 'Due date must be after today');
        }
        setShowDueDate(false);
        break;
      case 'start_date':
        if (value >= now) {
          setStartDate(value);
        } else {
          Alert.alert('Error', 'Start date must be after today');
        }
        setShowStartDate(false);
        break;
      case 'remainder_date':
        if (value > dueDate) {
          Alert.alert('Error', 'Remainder date must be before Due Date');
          setShowRemainderDate(false);
          break;
        }
        if (value < now) {
          Alert.alert('Error', 'Remainder date must be after today');
          setShowRemainderDate(false);
          break;
        }
        setRemainderDate(value);
        setShowRemainderDate(false);
        break;
      case 'remainder_time':
        setRemainderTime(value);
        setShowRemainderTime(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    initializeUseDataAsync = async () => {
      const r = (
        await datalayer.authLayer.getById('region', user?.['region_id'])
      )?.['region'];
      const b = (
        await datalayer.authLayer.getById('branch', user?.['branch_id'])
      )?.['branch'];
      const brand = (
        await datalayer.authLayer.getById('user', user?.['brand_id'])
      )?.['user'];

      console.log('user name is', user?.['name']);

      setBranch(b?.['name']);
      setBrands(brand?.['name']);
      setRegion(r?.['name']);
      setAssignTo(String(user?.['name']));
    };
    initializeUseDataAsync().catch(e => Alert.alert('Error', e?.['message']));
  }, [user]);

  const onCancel = () => {
    if (router.canGoBack()) router.back();
  };

  const dateToHHMM = (date = new Date()) =>
    `${date.getHours()}:${date.getMinutes()}`;

  const dateToYYYYMMDD = (date = new Date()) =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const create = async () => {
    const response = await datalayer.taskLayer
      .createTask({
        task_name: taskName,
        brand_id: user?.['brand_id'],
        branch_id: user?.['branch_id'],
        region_id: user?.['region_id'],
        assigned_to: user?.['id'],
        description: taskDescription,
        due_date: dateToYYYYMMDD(dueDate),
        start_date: dateToYYYYMMDD(startDate),
        remainder_date: dateToYYYYMMDD(remainderDate),
        remainder_time: dateToHHMM(remainderTime),
        assign_type: 'user',
      })
      .catch(e => Alert.alert('Error', e?.['message']));
    if (response?.['status'].toLowerCase() == 'success') {
      router.dismiss();
    } else {
      Alert.alert('Error', response?.['message']);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#ffffff', paddingTop: 40}}>
      <ScrollView
        style={{padding: 20}}
        contentContainerStyle={{gap: 10}}>
        <Text
          key={'Task Details'}
          style={{
            fontFamily: 'poppins-500',
            fontSize: 16,
            width: '100%',
            color: '#7647EB',
          }}>
          Task Details
        </Text>

        <View
          key={'TaskDetailsInputs'}
          style={{
            marginBottom: 6,
          }}>
          <TaskField
            key={'Task Name'}
            label={'Task Name'}
            placeholder={'Task Name'}
            value={taskName}
            onChange={setTaskName}
          />
          <TaskField
            key={'Brand'}
            label={'Brand'}
            placeholder={'Brand'}
            value={brands}
            readonly={true}
          />
          <TaskField
            key={'Branch'}
            label={'Branch'}
            placeholder={'Branch'}
            value={branch}
            readonly={true}
          />
          <TaskField
            key={'Region'}
            label={'Region'}
            placeholder={'Region'}
            value={region}
            readonly={true}
          />
          <TaskField
            key={'Assigned To'}
            label={'Assigned To'}
            placeholder={'Assigned To'}
            value={assignTo}
            readonly={true}
          />
          <TaskField
            key={'Task Status'}
            label={'Task Status'}
            placeholder={'Task Status'}
            value={selectedTaskStatus}
            onChange={v => {
              console.log('value is', v);
              setSelectedTaskStatus(v.id);
            }}
            isSearchable={true}
            data={[
              {id: 0, name: 'On Going'},
              {id: 1, name: 'Completed'},
            ]}
          />
          <TaskField
            key={'Due Date'}
            label={'Due Date'}
            placeholder={'Due Date'}
            value={dueDate?.toDateString()}
            readonly={true}
            style={{backgroundColor: '#fff'}}
            onChange={handleDueDateClick}
            trailing={<DateIcon style={{color: '#333'}} />}
          />
        </View>
        <Text
          key={'Additional Task Details'}
          style={{
            fontFamily: 'poppins-500',
            fontSize: 16,
            width: '100%',
            color: '#7647EB',
          }}>
          Additional Information
        </Text>
        <View
          style={{
            marginVertical: 6,
          }}>
          <TaskField
            label={'Start Date'}
            placeholder={'Start Date'}
            value={startDate?.toDateString()}
            readonly={true}
            onChange={handleStartDateClick}
            style={{backgroundColor: '#fff'}}
            trailing={<DateIcon style={{color: '#333'}} />}
          />
          <TaskField
            label={'Remainder Date'}
            placeholder={'Remainder Date'}
            value={remainderDate?.toDateString()}
            readonly={true}
            onChange={handleRemainderDateClick}
            style={{backgroundColor: '#fff'}}
            trailing={<DateIcon style={{color: '#333'}} />}
          />
          <TaskField
            label={'Remainder Time'}
            placeholder={'Remainder Time'}
            value={dateToHHMM(remainderTime)}
            readonly={true}
            onChange={handleRemainderTimeClick}
            style={{backgroundColor: '#fff'}}
            trailing={<ClockIcon />}
          />
        </View>
        <Text
          key={'Additional Task Details'}
          style={{
            fontFamily: 'poppins-500',
            fontSize: 16,
            width: '100%',
            color: '#7647EB',
          }}>
          Task Description
        </Text>
        <InputField
          lines={5}
          value={taskDescription}
          onChange={value => {
            console.info('task description will change to' + value);
            setTaskDescription(value);
          }}
          style={{fieldStyle: {textAlignVertical: 'top'}}}
          multiline={true}
        />
        <View
          key={'footer'}
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'end',
            alignContent: 'end',
            justifyContent: 'center',
            gap: 10,
            flex: 1,
            marginBottom: 30,
            marginTop: 10,
          }}>
          <Btn
            handleClick={onCancel}
            title="Cancel"
            style={{
              borderColor: '#DC3545',
              backgroundColor: 'transparent',
              borderWidth: 1,
              color: '#DC3545',
              elevation: 0,
            }}
          />
          <Btn title="Create" handleClick={create} style={{elevation: 0}} />
        </View>

        {(!!showDueDate ||
          !!showStartDate ||
          !!showRemainderDate ||
          !!showRemainderTime) && (
          <DateTimePicker
            value={
              !!showDueDate
                ? dueDate
                : !!showStartDate
                ? startDate
                : !!showRemainderTime
                ? remainderTime
                : remainderDate
            }
            mode={!!showRemainderTime ? 'time' : 'date'}
            is24Hour={true}
            onChange={change => {
              let type;
              if (!!showDueDate) type = 'due_date';
              else if (!!showStartDate) type = 'start_date';
              else if (!!showRemainderDate) type = 'remainder_date';
              else if (!!showRemainderTime) type = 'remainder_time';
              setDate(new Date(change.nativeEvent.timestamp), type);
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateTask;
