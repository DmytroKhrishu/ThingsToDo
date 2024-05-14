import axios from 'axios';

const BACKEND_URL =
  'https://thingstodo-2be60-default-rtdb.europe-west1.firebasedatabase.app/';

export async function storeTask(taskData) {
  const response = await axios.post(
    BACKEND_URL + '/tasks.json',
    taskData
  );
  const id = response.data.name;
  return id;
}

export async function fetchTasks() {
  const response = await axios.get(BACKEND_URL + '/tasks.json');
  const tasks = [];

  for (const key in response.data) {
    const taskObj = {
      id: key,
      task: response.data[key].task,
      description: response.data[key].description,
      isCompleted: response.data[key].isCompleted,
      date: new Date(response.data[key].date).toDateString(),
    };
    tasks.push(taskObj);
  }
  console.log(tasks)
  return tasks;
}

export function updateTaskBackend(id, taskData) {
  const taskObj = {
    id: id,
    task: taskData.task,
    description: taskData.description,
    isCompleted: taskData.isCompleted,
    // isCompleted: false,
    date: new Date(taskData.date).toDateString(),
  };
  return axios.put(BACKEND_URL + `/tasks/${id}.json`, taskObj);
}

export  function deleteTaskBackend(id) {
  return axios.delete(BACKEND_URL + `/tasks/${id}.json`);
}