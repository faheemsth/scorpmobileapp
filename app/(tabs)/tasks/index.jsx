import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TaskListItem} from '../../components/task-list-item';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, StyleSheet} from 'react-native';
import datalayer from '../../../datalayer/datalayer';

import Plus from '../../../assets/icons/plus.svg';
import CreateTask from './create-task';
import {router, useNavigation} from 'expo-router';
import ViewTask from './view-task';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToView, setTaskToView] = useState()
  const [user, setUser] = useState();

  const addTaskBtnClick = async () => {
    router.push('/tasks/create-task');
  };

  handleShowDetailClick = (task) => {
    console.log("task to show", task)
    setTaskToView(task?.["id"])
  }

  useEffect(() => {
    const asyncCall = async () => {
      const u = await datalayer.authLayer.getUserAsync();
      setUser(u);
      const data = await datalayer.taskLayer.getTasks();
      setTasks(data['tasks']);
      console.log('tasks are', data['tasks']);
    };
    asyncCall().catch(console.error);
  }, []);

  return (
    <SafeAreaView style={{position: 'relative', height: '100%'}}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        {tasks.length == 0 && <Text style={styles.txt}>No Record Found</Text>}
        {tasks.length > 0 && <Text style={styles.txt}>All Tasks</Text>}
        {tasks.map(t => {
          let taskStatus;
          if (t['status'] == '1') {
            taskStatus = 'Completed';
          } else {
            const d = new Date(t['due_date']);
            const today = new Date();
            if (today.getTime() > d.getTime()) {
              taskStatus = 'Overdue';
            } else {
              taskStatus = 'On Going';
            }
          }
          return (
            <TaskListItem
              name={user?.['name']}
              date={t?.['due_date']}
              imageUrl={user?.['avatar']}
              description={t?.['name']}
              status={taskStatus}
              descriptionText={t?.['description']}
              onDetailClick={()=>{handleShowDetailClick(t)}}
            />
          );
        })}
      </ScrollView>
      {!!!taskToView && (
        <Pressable
          onPress={addTaskBtnClick}
          style={{
            position: 'absolute',
            bottom: 29,
            right: 13,
            padding: 16,
            backgroundColor: '#167BC4',
            borderRadius: 5,
            elevation: 4,
            zIndex: 1,
          }}>
          <Plus />
        </Pressable>
      )}
      {!!taskToView && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            bottom: 0,
            backgroundColor: 'transparent',
          }}>
          <ViewTask
            onClose={()=>setTaskToView(undefined)}
            id={taskToView}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  txt: {
    fontFamily: 'outfit-600',
  },
});

export default AllTasks;
