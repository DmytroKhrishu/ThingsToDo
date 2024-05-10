import { Alert } from 'react-native';
import { useContext } from 'react';
import { TasksContext } from '../store/tasks-context';
import { useNavigation } from '@react-navigation/native';

import TaskForm from '../components/TaskForm';
import { storeTask } from '../util/http';

export default function AddTask() {
  const navigation = useNavigation();

  const tasksCtx = useContext(TasksContext);

  async function addTask(task, description, date) {
    if (task.trim() !== '' && description.trim() !== '' && date) {
      const taskItem = {
        task: task,
        description: description,
        date: new Date(date).toDateString(),
      };
      const taskId = await storeTask({ isCompleted: false, ...taskItem })
      tasksCtx.addTask({id: taskId, ...taskItem});
      navigation.navigate('Tasks');
    } else {
      Alert.alert('Oops', 'Please fill out all fields');
    }
  }

  return <TaskForm onSubmitTask={addTask} mode="add" />;
}
