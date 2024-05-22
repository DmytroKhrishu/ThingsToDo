import { useContext,  useLayoutEffect, useState } from 'react';
import TaskList from '../components/TasksOutput/TaskList';
import { TasksContext } from '../store/tasks-context';
import LoadingOverlay from '../components/UI/LoadingOverlay';

export default function CompletedTasks({navigation}) {
  const tasksCtx = useContext(TasksContext);
  const tasks = tasksCtx.tasks;

  useLayoutEffect(() => {
      tasksCtx.setFetchedTasks();
   
  }, []);

  if (tasksCtx.isFetching) {
    return <LoadingOverlay />;
  }

  const completedTasks =
    tasks && tasks.filter((task) => task.isCompleted === true);


  function onItemClick(id) {
    navigation.navigate('EditTask', { id: id });
  }

  return (
    <>
      <TaskList tasks={completedTasks} onItemClick={onItemClick} />
    </>
  );
}
