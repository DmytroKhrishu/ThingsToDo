import { Alert } from 'react-native';
import { useContext } from 'react';
import { TasksContext } from '../store/tasks-context';
import { useNavigation } from '@react-navigation/native';

import TaskForm from '../components/TaskForm';
import { storeTask } from '../util/http';

export default function AddTask() {
  const navigation = useNavigation();

  const tasksCtx = useContext(TasksContext);

  function addTask(task, description, date) {
    tasksCtx.addTask({ task: task, description: description, date: date });
    navigation.navigate('Tasks');
  }

  return <TaskForm onSubmitTask={addTask} mode="add" />;
}
