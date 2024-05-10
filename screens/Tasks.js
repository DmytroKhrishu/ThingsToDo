import { useContext, useState } from 'react';
import TaskList from '../components/TasksOutput/TaskList';
import { TasksContext } from '../store/tasks-context';
import DetailsModal from '../components/DetailsModal';
import { Text } from 'react-native';

export default function Tasks() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [clickedItemId, setClickedItemId] = useState('');
  const tasksCtx = useContext(TasksContext);
  const tasks = tasksCtx.tasks;
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
      <DetailsModal taskId={clickedItemId} onClose={closeModal} isVisible={modalIsVisible} />
      <TaskList tasks={uncompletedTasks} onItemClick={onItemClick} />
    </>
  );
}


