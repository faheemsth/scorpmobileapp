import {View, Text, ScrollView, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import datalayer from '../../../datalayer/datalayer';
import styles from '../../components/theme';
import Btn from '../../components/btn';
import TickIcon from '../../../assets/icons/tick.svg';
import {router, useLocalSearchParams, useNavigation} from 'expo-router';

const ViewTask = () => {
  const {id} = useLocalSearchParams();
  const [task, setTask] = useState(undefined);
  const [taskDetails, setTaskDetails] = useState([]);
  const [additionalDetails, setAdditionalDetails] = useState([]);

  const nav = useNavigation();

  onTaskComplete = () => {
    fetchAsync = async () => {
      if (task?.['status'] == 0) {
        if (router.canDismiss()) {
          router.dismiss();
        }
      }
      const success = await datalayer.taskLayer.markCompleted(id);
      if (success) {
        if (router.canDismiss()) {
          router.dismiss();
        }
      }
    };
    fetchAsync().catch(e => Alert.alert('Error', e?.['message']));
  };

  useEffect(() => {
    nav.setOptions({headerTitle: 'Task Details', headerTransparent: false});
    fetchAsync = async () => {
      const tsk = await datalayer.taskLayer
        .getTaskDetails(id)
        .then(e => {
          return e?.['task'];
        })
        .catch(e => Alert.alert('Error', e?.['message']));

      const branch = (
        await datalayer.authLayer.getById('branch', tsk?.['branch_id'])
      )?.['branch'];
      const assignedTo = (
        await datalayer.authLayer.getById('user', tsk?.['assigned_to'])
      )?.['user'];

      const tskDtl = [
        {title: 'Record ID', value: tsk?.['id']},
        {title: 'Task Name', value: tsk?.['name']},
        {title: 'Agency', value: branch?.['name']},
        {title: 'Assigned To', value: assignedTo?.['name']},
        {title: 'Due Date', value: tsk?.['due_date']},
      ];

      const adDtl = [
        {title: 'Start Date', value: tsk?.['start_date']},
        {title: 'Remainder Date', value: tsk?.['remainder_date']},
        {title: 'Updated At', value: tsk?.['updated_at']},
        {title: 'Created At', value: tsk?.['created_at']},
      ];

      setTask(tsk);
      setTaskDetails(tskDtl);
      setAdditionalDetails(adDtl);
    };
    fetchAsync().catch(e => Alert.alert('Error', e?.['message']));
  }, [id]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.ph(10),
        styles.gap(10),
        {backgroundColor: '#ffffff'},
      ]}>
      {!!!task ? (
        <Text style={[styles.font(500), styles.size(16), {color: '#7647EB'}]}>
          Loading...
        </Text>
      ) : (
        <>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[styles.font(500), styles.size(16)]}>
              Task
            </Text>
            <Text
              style={[
                styles.font(400),
                styles.size(12),
                {paddingStart: 16,flex: 1, color: '#A0A0A0'},
              ]}
              numberOfLines={2}
              ellipsizeMode="tail">
              {task?.['name']}
            </Text>
          </View>
          <Text style={[styles.font(500), styles.size(16), {color: '#7647EB'}]}>
            Task Details
          </Text>
          {taskDetails?.map(tsk => (
            <View
              style={[styles.flex, styles.column, styles.pv(0)]}
              key={tsk?.['title']}>
              <Text
                style={[styles.font(400), styles.size(12), {color: '#A0A0A0'}]}>
                {tsk?.title}
              </Text>
              <Text
                style={[styles.font(400), styles.size(12), {color: '#000000'}]}>
                {tsk?.value}
              </Text>
            </View>
          ))}

          <Text style={[styles.font(500), styles.size(16), {color: '#7647EB'}]}>
            Additional information
          </Text>

          {additionalDetails?.map(tsk => (
            <View style={[styles.flex, styles.column]} key={tsk?.['title']}>
              <Text
                style={[styles.font(400), styles.size(12), {color: '#A0A0A0'}]}>
                {tsk?.title}
              </Text>
              <Text
                style={[styles.font(400), styles.size(12), {color: '#000000'}]}>
                {tsk?.value}
              </Text>
            </View>
          ))}

          <Text style={[styles.font(500), styles.size(16), {color: '#7647EB'}]}>
            Task Description
          </Text>
          <Text style={[styles.font(400), styles.size(12), {color: '#000000'}]}>
            {task?.description}
          </Text>
          <Btn
            style={{
              alignSelf: 'center',
              backgroundColor: task?.['status'] == 1 ? '#FFFFFF' : '#7647EB',
              color: task?.['status'] == 1 ? '#7647EB' : '#FFFFFF',
              borderWidth: task?.['status'] == 1 ? 1 : 0,
              borderColor: '#7647EB',
            }}
            title={task?.['status'] == 1 ? 'Completed' : 'Mark as Completed'}
            leading={task?.['status'] == 1 ? null : <TickIcon style={{color: '#7647EB'}} />}
            handleClick={onTaskComplete}
          />
        </>
      )}
    </ScrollView>
  );
};

export default ViewTask;
