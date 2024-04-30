import { createContext, useState } from 'react';

export const TasksContext = createContext({
  tasks: [],
  addTask: ({ task, description, date }) => {},
  deleteTask: (id) => {},
  updateTask: (id, { task, description, date }) => {},
});

export default function TasksContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  function addTask(task) {
    setTasks((prev) => [...prev, task]);
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
    deleteTask,
    updateTask,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
