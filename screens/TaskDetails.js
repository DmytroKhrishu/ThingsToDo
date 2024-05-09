import { useContext } from 'react';
import { Text, View } from 'react-native';
import { TasksContext } from '../store/tasks-context';

export default function TaskDetails({ taskId }) {
  const tasksCtx = useContext(TasksContext);
  const task = tasksCtx.tasks.find((task) => task.id === taskId);

  return (
    <View>
      <Text>{task.task}</Text>
    </View>
  );
}
