import {View, Text, ScrollView, Pressable, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Btn from '../../components/btn';
import InputField from '../../components/input-field';
import {router, useNavigation} from 'expo-router';
import datalayer from '../../../datalayer/datalayer';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateIcon from '../../../assets/icons/calendar.svg';
import ClockIcon from '../../../assets/icons/timer.svg';
import SearchableDropdown from '../../components/searchable-dropdown';

const TaskField = ({
  label,
  readonly,
  placeholder,
  value,
  onChange,
  trailing,
  isSearchable = false,
  data = [],
  restrictToList = true,
}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginVertical: 8,
      }}>
      <Text style={{flex: 0.5}}>{label}</Text>
      {isSearchable ? (
        <SearchableDropdown
          data={data}
          placeholder={placeholder}
          restrictToList={restrictToList}
          onItemSelected={onChange}
        />
      ) : (
        <InputField
          style={{flex: 1, backgroundColor: '#0002', marginEnd: 0}}
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

const CreateTask = ({onClose}) => {
  const [user, setUser] = useState();

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [brands, setBrands] = useState('');
  const [region, setRegion] = useState('');
  const [branch, setBranch] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [taskStatus, setTaskStatus] = useState([0, 1]);
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
        setDueDate(value);
        setShowDueDate(false);
        break;
      case 'start_date':
        setStartDate(value);
        setShowStartDate(false);
      case 'remainder_date':
        setRemainderDate(value);
        setShowRemainderDate(false);
      case 'remainder_time':
        setRemainderTime(value);
        setShowRemainderTime(false);
      default:
        break;
    }
  };

  useEffect(() => {
    initializeUseDataAsync = async () => {
      const u = await datalayer.authLayer
        .getUserAsync()
        .catch(e => Alert.alert('Error', e?.["message"]));

      const r = await datalayer.authLayer.getById('region', u?.['region_id'])?.[
        'region'
      ];
      const b = await datalayer.authLayer.getById('branch', u?.['branch_id'])?.[
        'branch'
      ];
      const brand = await datalayer.authLayer.getById(
        'user',
        u?.['brand_id'],
      )?.['user'];

      setBranch(b?.['name']);
      setBrands(brand?.['name']);
      setRegion(r?.['name']);
      setAssignTo(String(u?.['name']));
      setUser(u);
    };
    initializeUseDataAsync().catch(e=>Alert.alert("Error", e?.["message"]));
  }, []);

  const onCancel = () => {
    if (router.canGoBack()) router.back();
  };

  const dateToHHMM = (date = new Date()) =>
    `${date.getHours()}:${date.getMinutes()}`;

  const dateToYYYYMMDD = (date = new Date()) =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const create = async () => {
    const response = await datalayer.taskLayer.createTask({
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
    });
    if (response?.['status'].toLowerCase() == 'success') {
      router.dismiss();
    }
    console.log('response', response);
  };

  return (
    <ScrollView style={{marginTop: 80, paddingHorizontal: 20}}>
      <Text
        key={'Task Details'}
        style={{
          fontFamily: 'outfit-400',
          fontSize: 15,
          paddingVertical: 10,
          width: '100%',
          borderBottomWidth: 1,
          borderStyle: 'dashed',
          borderColor: '#0006',
        }}>
        Task Details
      </Text>

      <View
        key={'TaskDetailsInputs'}
        style={{
          marginVertical: 16,
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
          onChange={setBrands}
          readonly={true}
        />
        <TaskField
          key={'Branch'}
          label={'Branch'}
          placeholder={'Branch'}
          value={branch}
          onChange={setBranch}
          readonly={true}
        />
        <TaskField
          key={'Region'}
          label={'Region'}
          placeholder={'Region'}
          value={region}
          onChange={setRegion}
          readonly={true}
        />
        <TaskField
          key={'Assigned To'}
          label={'Assigned To'}
          placeholder={'Assigned To'}
          value={assignTo}
          onChange={setAssignTo}
          readonly={true}
        />
        <TaskField
          key={'Task Status'}
          label={'Task Status'}
          placeholder={'Task Status'}
          value={taskStatus}
          onChange={v => setSelectedTaskStatus(v.id)}
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
          trailing={
            <Pressable onPress={handleDueDateClick}>
              <DateIcon />
            </Pressable>
          }
        />
      </View>
      <Text
        key={'Additional Task Details'}
        style={{
          fontFamily: 'outfit-400',
          fontSize: 15,
          paddingVertical: 10,
          width: '100%',
          borderBottomWidth: 1,
          borderStyle: 'dashed',
          borderColor: '#0006',
        }}>
        Additional Information
      </Text>
      <View
        style={{
          marginVertical: 16,
        }}>
        <TaskField
          label={'Start Date'}
          placeholder={'Start Date'}
          value={startDate?.toDateString()}
          readonly={true}
          trailing={
            <Pressable onPress={handleStartDateClick}>
              <DateIcon />
            </Pressable>
          }
        />
        <TaskField
          label={'Remainder Date'}
          placeholder={'Remainder Date'}
          value={remainderDate?.toDateString()}
          readonly={true}
          trailing={
            <Pressable onPress={handleRemainderDateClick}>
              <DateIcon />
            </Pressable>
          }
        />
        <TaskField
          label={'Remainder Time'}
          placeholder={'Remainder Time'}
          value={dateToHHMM(remainderTime)}
          readonly={true}
          trailing={
            <Pressable onPress={handleRemainderTimeClick}>
              <ClockIcon />
            </Pressable>
          }
        />
      </View>
      <View
        key={'footer'}
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignItems: 'end',
          alignContent: 'end',
          justifyContent: 'flex-end',
          gap: 10,
          width: '100%',
          position: 'static',
          bottom: 0,
          right: 0,
        }}>
        <Btn
          handleClick={onCancel}
          title="Cancel"
          style={{backgroundColor: '#0001', color: 'black', elevation: 0}}
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
  );
};

export default CreateTask;
