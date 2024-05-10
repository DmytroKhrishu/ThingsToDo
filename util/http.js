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
  console.log(response)
  const tasks = [];

  for (const key in response.data) {
    const taskObj = {
      id: key,
      task: response.data[key].task,
      description: response.data[key].description,
      isCompleted: response.data[key].isCompleted,
      date: new Date(response.data[key].date),
    };
    tasks.push(taskObj);
  }

  return tasks;
}

export function updateTask(id, taskData) {
  return axios.put(BACKEND_URL + `/tasks/${id}.json`, taskData);
}

export  function deleteTask(id) {
  return axios.delete(BACKEND_URL + `/tasks/${id}.json`);
}