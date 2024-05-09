import { Alert } from 'react-native';
import { useContext } from 'react';
import { TasksContext } from '../store/tasks-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import TaskForm from '../components/TaskForm';

export default function EditTask() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const id = route.params.id;

  const tasksCtx = useContext(TasksContext);

  function editTask(task, description, date) {
    if (task && description && date) {
      const taskItem = {
        task: task,
        description: description,
        date: new Date(date).toDateString(),
      };
      tasksCtx.updateTask(id, taskItem);
      navigation.navigate('Tasks');
    } else {
      Alert.alert('Oops', 'Please fill out all fields');
    }
  }

  return <TaskForm onSubmitTask={editTask} mode="edit" taskId={id} />;
}
