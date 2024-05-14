import { createContext, useEffect, useState } from 'react';
import {
  deleteTaskBackend,
  fetchTasks,
  storeTask,
  updateTaskBackend,
} from '../util/http';


export const TasksContext = createContext({
  tasks: [],
  addTask: ({ task, description, date }) => {},
  setFetchedTasks: (tasks) => {},
  completeTask: (id) => {},
  uncompleteTask: (id) => {},
  deleteTask: (id) => {},
  updateTask: (id, { task, description, date }) => {},
});

export default function TasksContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isFetching, setIsFetching] = useState(false)

  async function addTask(task) {
    if (
      task.task.trim() !== '' &&
      task.description.trim() !== '' &&
      task.date
    ) {
      const taskItem = {
        task: task.task,
        description: task.description,
        date: task.date.toDateString(),
      };
      const taskId = await storeTask({ isCompleted: false, ...taskItem });
      setTasks((prev) => [...prev, { id: taskId, ...taskItem }]);
    } else {
      Alert.alert('Oops', 'Please fill out all fields');
    }
  }

  async function setFetchedTasks() {
    try {
      setIsFetching(true)
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
      // console.log('Get Tasks');
      // // console.log(fetchedTasks);
      // console.log(tasks);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  }

  async function completeTask(id) {
    try {
      const editedTask = tasks.find((task) => task.id === id);
      editedTask.isCompleted = true;
      updateTaskBackend(id, {...editedTask});
      await setFetchedTasks();
    } catch (error) {
      console.log(error);
    }
  }

  async function uncompleteTask(id) {
    try {
      const editedTask = tasks.find((task) => task.id === id);
      editedTask.isCompleted = false;
      updateTaskBackend(id, {...editedTask});
      await setFetchedTasks();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTask(id) {
    try {
      deleteTaskBackend(id);
      await setFetchedTasks();
    } catch (error) {
      console.log(error);
    }
  }

  async function updateTask(id, task) {
    try {
      const editedTask = tasks.find((task) => task.id === id);
      updateTaskBackend(id, { isCompleted: editedTask.isCompleted, ...task });
      await setFetchedTasks();
    } catch (error) {
      console.log(error);
    }
  }

  const value = {
    tasks: tasks,
    isFetching,
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
