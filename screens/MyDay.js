import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import TaskList from '../components/TasksOutput/TaskList';
import { TasksContext } from '../store/tasks-context';
import DetailsModal from '../components/DetailsModal';
import LoadingOverlay from '../components/UI/LoadingOverlay';

export default function MyDay() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [clickedItemId, setClickedItemId] = useState('');
  const tasksCtx = useContext(TasksContext);

  const tasks = tasksCtx.tasks;

  useLayoutEffect(() => {
    async function getTasks() {
      try {
        tasksCtx.setFetchedTasks();
      } catch (error) {
        console.log(error);
      }
    }
    getTasks();
  }, []);

  if (tasksCtx.isFetching) {
    return <LoadingOverlay />;
  }

  const todayTasks =
    tasks && tasks.filter((task) => task.date === new Date().toDateString());

  function openModal() {
    setModalIsVisible(true);
  }

  async function closeModal() {
    setModalIsVisible(false);
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
      <TaskList tasks={todayTasks} onItemClick={onItemClick} />
    </>
  );
}
