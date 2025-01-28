import {Text, Pressable, Alert} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {TaskListItem} from '../../components/task-list-item';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, StyleSheet} from 'react-native';
import datalayer from '../../../datalayer/datalayer';
import Plus from '../../../assets/icons/plus.svg';
import {router, useFocusEffect} from 'expo-router';
import TabBar from '../../components/tab-bar';
import { setStatusBarHidden } from 'expo-status-bar';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [filterIndex, setFilterIndex] = useState(0);

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

  useEffect(() => {
    if (filterIndex == 0) {
      setFilteredTasks(tasks);
    } else if (filterIndex == 1) {
      const ft = tasks?.filter(t => {
        const d = new Date(t['due_date']);
        const today = new Date();
        if (today.getTime() > d.getTime() && t.status == '0') {
          return true;
        }
        return false;
      });
      setFilteredTasks(ft);
    } else if (filterIndex == 2) {
      const ft = tasks?.filter(t => {
        const d = new Date(t['due_date']);
        const today = new Date();
        if (today.getTime() < d.getTime() && t.status == '0') {
          return true;
        }
        return false;
      });
      setFilteredTasks(ft);
    } else {
      const ft = tasks?.filter(t => t.status == '1');
      setFilteredTasks(ft);
    }
  }, [filterIndex, tasks]);

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
      <ScrollView contentContainerStyle={{gap: 10, paddingHorizontal: 10,}}>
        <Text
          style={[
            {
              fontFamily: 'poppins-500',
              color: '#7647EB',
              fontSize: 20,
              alignSelf: 'center',
            },
          ]}>
          Tasks
        </Text>
        <Text style={styles.txt}>
          {isLoading
            ? 'Loading...'
            : tasks.length < 1
            ? 'No Record Found'
            : 'All Tasks'}
        </Text>
        
<ScrollView
  style={{ alignContent: 'center' }}
  horizontal={true}
  contentContainerStyle={{
    paddingHorizontal: 10, 
    flexDirection: 'row',   
    alignItems: 'center',  
    justifyContent: 'flex-start',
  }}
  showsHorizontalScrollIndicator={false}
>
  <TabBar
    tabs={[
      { title: 'All' },
      { title: 'Overdue' },
      { title: 'On Going' },
      { title: 'Completed' },
    ]}
    onTabChange={setFilterIndex}
    selectedIndex={filterIndex} // Pass the selectedIndex to highlight the active tab
  />
</ScrollView>


  

        {filteredTasks?.map(t => {
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
              title={t?.['name']}
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
          backgroundColor: '#7647EB',
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
    fontFamily: 'poppins-500',
    fontSize: 16,
    lineHeight: 24
  },
});

export default AllTasks;
