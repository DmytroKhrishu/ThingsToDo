import { createContext, useState } from 'react';

export const DUMMY_TASKS = [
  {
    id: 't1',
    task: 'Dummy Task',
    description: 'lalala',
    date: new Date().toDateString(),
  },
  {
    id: 't2',
    task: 'Dummy Task',
    description: 'lalala',
    date: new Date().toDateString(),
  },
  {
    id: 't3',
    task: 'Dummy Task',
    description: 'lalala',
    date: new Date().toDateString(),
  },
];

export const TasksContext = createContext({
  tasks: [],
  addTask: ({ task, description, date }) => {},
  deleteTask: (id) => {},
  updateTask: (id, { task, description, date }) => {},
});

export default function TasksContextProvider({ children }) {
  const [tasks, setTasks] = useState(DUMMY_TASKS);

  function addTask(task) {
    const taskId = ((Math.random() * 10).toFixed(2)).toString();
    setTasks((prev) => [...prev, { id: taskId, ...task }]);
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
