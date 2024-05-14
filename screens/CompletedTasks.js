import { useContext, useEffect, useState } from 'react';
import TaskList from '../components/TasksOutput/TaskList';
import { TasksContext } from '../store/tasks-context';
import DetailsModal from '../components/DetailsModal';
import { fetchTasks } from '../util/http';

export default function CompletedTasks() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [clickedItemId, setClickedItemId] = useState('');

  const tasksCtx = useContext(TasksContext);
  const tasks = tasksCtx.tasks;
  const isFetching = tasksCtx.isFetching;

  useEffect(() => {
    async function getTasks() {
      tasksCtx.setFetchedTasks();
    }
    getTasks();
  }, []);

  if (isFetching) {
    return <ActivityIndicator />;
  }

  const completedTasks =
    tasks && tasks.filter((task) => task.isCompleted === true);

  function openModal() {
    setModalIsVisible(true);
  }

  async function closeModal() {
    setModalIsVisible(false);
    tasksCtx.setFetchedTasks();
  }

  function onItemClick(id) {
    setClickedItemId(id);
    openModal();
  }

  return (
    <>
      <DetailsModal
        taskId={clickedItemId}
        onClose={closeModal}
        isVisible={modalIsVisible}
      />
      {completedTasks && (
        <TaskList tasks={completedTasks} onItemClick={onItemClick} />
      )}
    </>
  );
}
