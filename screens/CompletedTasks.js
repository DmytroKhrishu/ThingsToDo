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


  useEffect(() => {
    async function getTasks() {
      const fetchedTasks = await fetchTasks();
      tasksCtx.setFetchedTasks(fetchedTasks);
      console.log('Get Tasks');
      console.log(fetchedTasks);
    }
    getTasks();
  }, []);


  const completedTasks =
    tasks && tasks.filter((task) => task.isCompleted === true);

  function openModal() {
    setModalIsVisible(true);
  }

  function closeModal() {
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
      {completedTasks && (
        <TaskList tasks={completedTasks} onItemClick={onItemClick} />
      )}
    </>
  );
}
