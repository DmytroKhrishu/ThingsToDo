import { Alert } from 'react-native';
import { useContext } from 'react';
import { TasksContext } from '../store/tasks-context';
import { useNavigation } from '@react-navigation/native';

import TaskForm from '../components/TaskForm';

export default function AddTask() {
  const navigation = useNavigation();

  const tasksCtx = useContext(TasksContext);

  function addTask(task, description, date) {
    if (task && description && date) {
      const taskItem = {
        task: task,
        description: description,
        date: new Date(date).toDateString(),
      };
      tasksCtx.addTask(taskItem);
      navigation.navigate('Tasks');
    } else {
      Alert.alert('Oops', 'Please fill out all fields');
    }
  }

  return <TaskForm onSubmitTask={addTask} mode="add" />;
}
