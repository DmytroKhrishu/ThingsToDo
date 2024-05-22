import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import TaskList from '../components/TasksOutput/TaskList';
import { TasksContext } from '../store/tasks-context';
import DetailsModal from '../components/DetailsModal';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../const/colors';

export default function MyDay({navigation}) {
  const tasksCtx = useContext(TasksContext);

  const tasks = tasksCtx.tasks;

  useLayoutEffect(() => {
    async function getTasks() {
      try {
        tasksCtx.setFetchedTasks();
      } catch (error) {
        console.log(error);
      }
    }
    getTasks();
  }, []);

  if (tasksCtx.isFetching) {
    return <LoadingOverlay />;
  }

  const todayTasks =
    tasks && tasks.filter((task) => task.date === new Date().toDateString());

  function onItemClick(id) {
    navigation.navigate('EditTask', { id: id });
  }

  return (
    <>
      <Text style={styles.dateText}>{new Date().toDateString()}</Text>
      <TaskList tasks={todayTasks} onItemClick={onItemClick} />
    </>
  );
}

const styles = StyleSheet.create({
  dateText: {
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 5,
    backgroundColor: Colors.mainBackground,
    color: 'white',
    fontSize: 24,
  },
});
