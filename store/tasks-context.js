import { createContext, useEffect, useState } from 'react';

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
];

export const TasksContext = createContext({
  tasks: [],
  addTask: ({ task, description, date }) => {},
  completeTask: (id) => {},
  uncompleteTask: (id) => {},
  deleteTask: (id) => {},
  updateTask: (id, { task, description, date }) => {},
});

export default function TasksContextProvider({ children }) {
  const [tasks, setTasks] = useState(DUMMY_TASKS);

  function addTask(task) {
    const taskId = (Math.random() * 10).toFixed(2).toString();
    setTasks((prev) => [...prev, { id: taskId, isCompleted: false, ...task }]);
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
      prev[editedTaskIndex] = task;
    });
  }

  const value = {
    tasks: tasks,
    addTask,
    completeTask,
    uncompleteTask,
    deleteTask,
    updateTask,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
