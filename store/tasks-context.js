import { createContext, useEffect, useState } from 'react';
import { storeTask } from '../util/http';

export const DUMMY_TASKS = [
  {
    id: 't1',
    isCompleted: false,
    task: 'Dummy Task',
    description: 'lalala',
    date: new Date().toDateString(),
  },
  {
    id: 't2',
    isCompleted: false,
    task: 'Dummy Task',
    description: 'lalala',
    date: new Date().toDateString(),
  },
  {
    id: 't3',
    isCompleted: false,
    task: 'Dummy completed Task',
    description: 'lalala',
    date: new Date().toDateString(),
  },
  {
    id: 't4',
    isCompleted: false,
    task: 'Dummy completed Task',
    description: 'lalala',
    date: new Date().toDateString(),
  },
  {
    id: 't5',
    isCompleted: false,
    task: 'Dummy completed Task',
    description: 'lalala',
    date: new Date().toDateString(),
  },
];

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
  const [tasks, setTasks] = useState(DUMMY_TASKS);

  async function addTask(task) {
    setTasks((prev) => [...prev, { ...task }]);
  }

  function setFetchedTasks(tasks) {
    setTasks(tasks)
  }

  function completeTask(id) {
    setTasks((prev) => {
      const editedTaskIndex = prev.findIndex((item) => item.id === id);
      prev[editedTaskIndex].isCompleted = true;
      return [...prev];
    });
  }

  function uncompleteTask(id) {
    setTasks((prev) => {
      const editedTaskIndex = prev.findIndex((item) => item.id === id);
      prev[editedTaskIndex].isCompleted = false;
      return [...prev];
    });
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((item) => item.id != id));
  }

  function updateTask(id, task) {
    setTasks((prev) => {
      const editedTaskIndex = prev.findIndex((item) => item.id === id);
      prev[editedTaskIndex] = {
        id: prev[editedTaskIndex].id,
        isCompleted: prev[editedTaskIndex].isCompleted,
        ...task,
      };
      return [...prev];
    });
  }

  const value = {
    tasks: tasks,
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
