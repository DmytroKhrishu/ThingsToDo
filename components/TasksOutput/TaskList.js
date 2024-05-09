import { FlatList, Text, View } from 'react-native';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onItemClick }) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TaskItem task={item} onClick={() => onItemClick(item.id)} />}
    />
  );
}
