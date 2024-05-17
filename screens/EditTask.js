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

  function editTask(task, description, date, time) {
    if (task.trim() !== '' && description.trim() !== '' && date && time) {
      const taskItem = {
        task: task,
        description: description,
        date: date,
        time: time,
      };
      tasksCtx.updateTask(id, taskItem);
      tasksCtx.setFetchedTasks();
      navigation.navigate('Tasks');
    } else {
      Alert.alert('Oops', 'Please fill out all fields');
    }
  }

  return <TaskForm onSubmitTask={editTask} mode="edit" taskId={id} />;
}
