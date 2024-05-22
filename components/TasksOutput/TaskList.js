import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
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
      {tasks.length > 0 ? (
        <FlatList
          style={{ backgroundColor: Colors.mainBackground, paddingTop: 15 }}
          data={[...tasks, { id: 'addTask', addTask: true }]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (item.addTask) {
              return <AddTaskItem />;
            }
            return (
              <TaskItem task={item} onClick={() => onItemClick(item.id)} />
            );
          }}
          refreshControl={
            <RefreshControl tintColor={'white'} colors={["white"]} refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <ScrollView
          style={{ flex: 1, backgroundColor: Colors.mainBackground }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={styles.noTasksText}>No tasks yet</Text>
          <AddTaskItem />
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  noTasksContainer: {},
  noTasksText: {
    textAlign: 'center',
    color: 'white',
    marginVertical: 30,
    fontSize: 24,
  },
});
