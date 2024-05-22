import { Alert } from 'react-native';
import { useContext } from 'react';
import { TasksContext } from '../store/tasks-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import TaskForm from '../components/TaskForm';

export default function EditTask() {
  const navigation = useNavigation();
  const route = useRoute();
  const tasksCtx = useContext(TasksContext);

  const id = route.params.id;
  const editedTask = tasksCtx.tasks.find((task) => task.id === id);

  function editTask(task, description, date, time) {
    if (task.trim() !== '' && description.trim() !== '' && date && time) {
      const taskItem = {
        task: task,
        description: description,
        date: editedTask.date === date ? date : date.toDateString(),
        time: editedTask.time === time ? time : time.toTimeString(),
      };
      tasksCtx.updateTask(id, taskItem);
      tasksCtx.setFetchedTasks();
      navigation.goBack();
    } else {
      Alert.alert('Oops', 'Please fill out all fields');
    }
  }

  return <TaskForm onSubmitTask={editTask} mode="edit" taskId={id} />;
}
