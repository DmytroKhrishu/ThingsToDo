import { FlatList, Text, View } from 'react-native';
import TaskItem from './TaskItem';
import AddTaskItem from '../AddTaskItem';
import { Colors } from '../../const/colors';

export default function TaskList({ tasks, onItemClick }) {
  return (
    <>
      <FlatList
        style={{backgroundColor: Colors.mainBackground}}
        data={[...tasks, { id: 'addTask', addTask: true }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.addTask) {
            return <AddTaskItem />;
          }
          return <TaskItem task={item} onClick={() => onItemClick(item.id)} />;
        }}
      />
    </>
  );
}


