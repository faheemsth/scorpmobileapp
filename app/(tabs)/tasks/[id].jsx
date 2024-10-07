import {View, Text, ScrollView, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import datalayer from '../../../datalayer/datalayer';
import styles from '../../components/theme';
import Btn from '../../components/btn';
import TickIcon from '../../../assets/icons/tick.svg';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';

const ViewTask = () => {
  const {id} = useLocalSearchParams();
  const [task, setTask] = useState(undefined);
  const [taskDetails, setTaskDetails] = useState([]);
  const [additionalDetails, setAdditionalDetails] = useState([]);

  const nav = useNavigation();

  onTaskComplete = ()=>{
    fetchAsync = async ()=>{
      const success = await datalayer.taskLayer.markCompleted(id)
      if (success) {router.dismiss()}
    }
    fetchAsync().catch(e=>Alert.alert("Error", e?.["message"]))
  }

  useEffect(() => {
    nav.setOptions({headerTitle: "Task Details",headerTransparent: true, })
    fetchAsync = async () => {
      const tsk = await datalayer.taskLayer
        .getTaskDetails(id)
        .then(e => {
          return e?.['task'];
        })
        .catch(e=>Alert.alert("Error", e?.["message"]));

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
    fetchAsync().catch(e=>Alert.alert("Error", e?.["message"]));
  }, [id]);
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.ph(10), styles.pv(80), styles.gap(10)]}>
      {!!!task ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.font(500),
                styles.size(14),
                styles.pv(15),
                {flex: 1, borderStyle: 'dashed', borderBottomWidth: 1},
              ]}
              numberOfLines={2}
              ellipsizeMode="tail">
              {task?.['name']}
            </Text>
          </View>
          <Text style={[styles.font(500), styles.size(13), styles.pv(15)]}>
            Task Details
          </Text>
          {taskDetails?.map(tsk => (
            <View
              style={[styles.flex, styles.row, styles.pv(6)]}
              key={tsk?.['title']}>
              <Text style={[styles.font(400), styles.size(12), {flex: 0.4}]}>
                {tsk?.title}
              </Text>
              <Text style={[styles.font(400), styles.size(10), {flex: 0.6}]}>
                {tsk?.value}
              </Text>
            </View>
          ))}

          <Text style={[styles.font(500), styles.size(13), styles.pv(15)]}>
            Additional information
          </Text>

          {additionalDetails?.map(tsk => (
            <View
              style={[styles.flex, styles.row, styles.pv(6)]}
              key={tsk?.['title']}>
              <Text style={[styles.font(400), styles.size(12), {flex: 0.4}]}>
                {tsk?.title}
              </Text>
              <Text style={[styles.font(400), styles.size(10), {flex: 0.6}]}>
                {tsk?.value}
              </Text>
            </View>
          ))}
          <Btn
            style={{alignSelf: 'center'}}
            title="Completed"
            gradientColors={['#167BC4', '#6E7072']}
            leading={<TickIcon />}
            handleClick={onTaskComplete}
          />
        </>
      )}
    </ScrollView>
  );
};

export default ViewTask;
