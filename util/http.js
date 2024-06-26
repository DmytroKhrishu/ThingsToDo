import axios from 'axios';
import { BACKEND_URL } from '../const/private.js';

export async function storeTask(taskData, token, userId) {
  const response = await axios.post(
    BACKEND_URL + `/tasks/${userId}.json?auth=` + token,
    {
      ...taskData,
    }
  );
  const id = response.data.name;
  return id;
}

export async function fetchTasks(token, userId) {
  const response = await axios.get(
    BACKEND_URL + `/tasks/${userId}.json?auth=` + token
  );
  const tasks = [];

  for (const key in response.data) {
    const taskObj = {
      id: key,
      task: response.data[key].task,
      description: response.data[key].description,
      isCompleted: response.data[key].isCompleted,
      date: response.data[key].date,
      time: response.data[key].time,
    };
    tasks.push(taskObj);
  }
  tasks.sort((a, b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);

    return dateA - dateB;
  });
  return tasks;
}

export function updateTaskBackend(id, taskData, token, userId) {
  const taskObj = {
    id: id,
    task: taskData.task,
    description: taskData.description,
    isCompleted: taskData.isCompleted,
    date: taskData.date,
    time: taskData.time,
  };
  return axios.put(BACKEND_URL + `/tasks/${userId}/${id}.json?auth=` + token, {
    ...taskObj,
  });
}

export function deleteTaskBackend(id, token, userId) {
  return axios.delete(
    BACKEND_URL + `/tasks/${userId}/${id}.json?auth=` + token
  );
}
