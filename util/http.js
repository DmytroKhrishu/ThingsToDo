import axios from 'axios';
const BACKEND_URL =
  'https://thingstodo-2be60-default-rtdb.europe-west1.firebasedatabase.app/';

export async function storeTask(taskData, token, userId) {
  const response = await axios.post(BACKEND_URL + '/tasks.json?auth=' + token, {
    userId: userId,
    ...taskData,
  });
  const id = response.data.name;
  return id;
}

export async function fetchTasks(token, userId) {
  const response = await axios.get(BACKEND_URL + '/tasks.json?auth=' + token);
  const tasks = [];

  for (const key in response.data) {
    const taskObj = {
      id: key,
      task: response.data[key].task,
      description: response.data[key].description,
      isCompleted: response.data[key].isCompleted,
      userId: response.data.userId,
      date: new Date(response.data[key].date).toDateString(),
    };
    if (response.data[key].userId === userId) {
      tasks.push(taskObj);
    }
  }
  console.log(tasks);
  return tasks;
}

export function updateTaskBackend(id, taskData, token, userId) {
  const taskObj = {
    id: id,
    task: taskData.task,
    description: taskData.description,
    isCompleted: taskData.isCompleted,  
    userId: userId,
    date: new Date(taskData.date).toDateString(),
  };
  return axios.put(BACKEND_URL + `/tasks/${id}.json?auth=` + token, {
    ...taskObj,
  });
}

export function deleteTaskBackend(id, token) {
  return axios.delete(BACKEND_URL + `/tasks/${id}.json?auth=` + token);
}
