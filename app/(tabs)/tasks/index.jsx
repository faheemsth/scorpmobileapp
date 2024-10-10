import {View, Text, Pressable, Alert} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {TaskListItem} from '../../components/task-list-item';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, StyleSheet} from 'react-native';
import datalayer from '../../../datalayer/datalayer';

import Plus from '../../../assets/icons/plus.svg';
import {router, useFocusEffect} from 'expo-router';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const addTaskBtnClick = async () => {
    router.push('/tasks/create-task');
  };

  handleShowDetailClick = task => {
    console.log('task to show', task);
    router.navigate(`tasks/${task?.['id']}`);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [tasks]);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      // Fetch user and tasks data asynchronously
      const asyncCall = async () => {
        try {
          const u = await datalayer.authLayer.getUserAsync();
          setUser(u);

          const data = await datalayer.taskLayer.getTasks();
          setTasks(data['tasks']);
          console.log('tasks are', data['tasks']);
        } catch (error) {
          Alert.alert('Error', error?.['message']);
        }
      };

      asyncCall().catch(e => Alert.alert('Error', e?.['message']));

      // Cleanup function (optional)
      return () => {
        setUser(null); // Clear user data if needed
        setTasks([]); // Clear tasks when screen is unfocused
      };
    }, []), // Empty dependency array to run only when the screen is focused
  );

  return (
    <SafeAreaView
      style={{position: 'relative', height: '100%', backgroundColor: '#fff'}}>
      <ScrollView contentContainerStyle={{gap: 10, padding: 10}}>
        <Text style={[styles.txt, {fontSize: 24, alignSelf: 'center'}]}>
          Tasks
        </Text>
        <Text style={styles.txt}>
          {isLoading
            ? 'Loading...'
            : !!!tasks
            ? 'No Record Found'
            : 'All Tasks'}
        </Text>
        {tasks?.map(t => {
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
              key={t?.['id']}
              name={user?.['name']}
              date={t?.['due_date']}
              imageUrl={user?.['avatar']}
              description={t?.['name']}
              status={taskStatus}
              descriptionText={t?.['description']}
              onDetailClick={() => {
                handleShowDetailClick(t);
              }}
            />
          );
        })}
      </ScrollView>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  txt: {
    fontFamily: 'outfit-600',
    paddingVertical: 4
  },
});

export default AllTasks;
