import { createContext, useContext, useEffect, useState } from 'react';
import {
  deleteTaskBackend,
  fetchTasks,
  storeTask,
  updateTaskBackend,
} from '../util/http';
import { Alert } from 'react-native';
import { AuthContext } from './auth-context';

export const TasksContext = createContext({
  tasks: [],
  theme: '',
  setTheme: (theme) => {},
  addTask: ({ task, description, date, time }) => {},
  setFetchedTasks: (tasks) => {},
  completeTask: (id) => {},
  uncompleteTask: (id) => {},
  deleteTask: (id) => {},
  updateTask: (id, { task, description, date, time }) => {},
});

export default function TasksContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [appTheme, setAppTheme] = useState('dark')

  const authCtx = useContext(AuthContext);

  async function addTask(task) {
    if (
      task.task.trim() !== '' &&
      task.description.trim() !== '' &&
      task.date &&
      task.time
    ) {
      const taskItem = {
        task: task.task,
        isCompleted: false,
        description: task.description,
        date: task.date.toDateString(),
        time: task.time.toTimeString(),
      };
      const taskId = await storeTask(
        { ...taskItem },
        authCtx.token,
        authCtx.userId
      );
      setTasks((prev) => [...prev, { id: taskId, ...taskItem }]);
    } else {
      Alert.alert('Oops', 'Please fill out all fields');
    }
  }

  async function setFetchedTasks() {
    try {
      setIsFetching(true);
      const fetchedTasks = await fetchTasks(authCtx.token, authCtx.userId);
      setTasks(fetchedTasks);
      setIsFetching(false);
    } catch (error) {
      Alert.alert('Error', "Could not fetch tasks")
      setIsFetching(false);
    }
  }

  async function completeTask(id) {
    try {
      const editedTask = tasks.find((task) => task.id === id);
      editedTask.isCompleted = true;
      updateTaskBackend(id, { ...editedTask }, authCtx.token, authCtx.userId);
      await setFetchedTasks();
    } catch (error) {
      console.log(error);
    }
  }

  async function uncompleteTask(id) {
    try {
      const editedTask = tasks.find((task) => task.id === id);
      editedTask.isCompleted = false;
      updateTaskBackend(id, { ...editedTask }, authCtx.token, authCtx.userId);
      await setFetchedTasks();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTask(id) {
    try {
      deleteTaskBackend(id, authCtx.token, authCtx.userId);
      await setFetchedTasks();
    } catch (error) {
      console.log(error);
    }
  }

  async function updateTask(id, task) {
    try {
      const editedTask = tasks.find((task) => task.id === id);
      updateTaskBackend(
        id,
        {
          isCompleted: editedTask.isCompleted,
          ...task,
        },
        authCtx.token,
        authCtx.userId
      );
      await setFetchedTasks();
    } catch (error) {
      console.log(error);
    }
  }

  function setTheme(theme){
    setAppTheme(theme)
  }

 
  const value = {
    tasks: tasks,
    isFetching,
    theme: appTheme, 
    setTheme,
    addTask,
    setFetchedTasks,
    completeTask,
    uncompleteTask,
    deleteTask,
    updateTask,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
