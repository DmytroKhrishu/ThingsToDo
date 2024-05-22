import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import TaskList from '../components/TasksOutput/TaskList';
import { TasksContext } from '../store/tasks-context';
import DetailsModal from '../components/DetailsModal';
import LoadingOverlay from '../components/UI/LoadingOverlay';

export default function Tasks({ navigation }) {
  const tasksCtx = useContext(TasksContext);

  const tasks = tasksCtx.tasks;

  useLayoutEffect(() => {
    async function getTasks() {
      try {
        await tasksCtx.setFetchedTasks();
      } catch (error) {
        console.log(error);
      }
    }
    getTasks();
  }, []);

  if (tasksCtx.isFetching) {
    return <LoadingOverlay />;
  }

  const uncompletedTasks =
    tasks && tasks.filter((task) => task.isCompleted !== true);

  function onItemClick(id) {
    navigation.navigate('EditTask', { id: id });
  }

  return (
    <>
      <TaskList tasks={uncompletedTasks} onItemClick={onItemClick} />
    </>
  );
}
