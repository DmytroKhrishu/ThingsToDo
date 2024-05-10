import { useContext, useEffect, useState } from 'react';
import TaskList from '../components/TasksOutput/TaskList';
import { TasksContext } from '../store/tasks-context';
import DetailsModal from '../components/DetailsModal';
import { Text } from 'react-native';
import { fetchTasks } from '../util/http';

export default function Tasks() {
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

  const uncompletedTasks =
    tasks && tasks.filter((task) => task.isCompleted !== true);

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
      {uncompletedTasks ? (
        <TaskList tasks={uncompletedTasks} onItemClick={onItemClick} />
      ) : (
        <Text>No tasks yet</Text>
      )}
    </>
  );
}
