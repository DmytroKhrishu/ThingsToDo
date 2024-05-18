import { FlatList, RefreshControl, Text, View } from 'react-native';
import TaskItem from './TaskItem';
import AddTaskItem from '../AddTaskItem';
import { Colors } from '../../const/colors';
import { useContext, useEffect, useState } from 'react';
import { TasksContext } from '../../store/tasks-context';
import { AuthContext } from '../../store/auth-context';

export default function TaskList({ tasks, onItemClick }) {
  const [refreshing, setRefreshing] = useState(false);

  const tasksCtx = useContext(TasksContext);
  const authCtx = useContext(AuthContext);

  function onRefresh() {
    setRefreshing(true);
    if (!authCtx.userId) {
      authCtx.logout();
    }
    tasksCtx.setFetchedTasks();
    setRefreshing(false);
  }

  return (
    <>
      <FlatList
        style={{ backgroundColor: Colors.mainBackground }}
        data={[...tasks, { id: 'addTask', addTask: true }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.addTask) {
            return <AddTaskItem />;
          }
          return <TaskItem task={item} onClick={() => onItemClick(item.id)} />;
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </>
  );
}
