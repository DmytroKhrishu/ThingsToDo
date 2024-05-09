import { useContext, useState } from 'react';
import TaskList from '../components/TasksOutput/TaskList';
import { TasksContext } from '../store/tasks-context';
import { Button, Modal } from 'react-native';
import TaskDetails from './TaskDetails';

export default function Tasks() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [clickedItemId, setClickedItemId] = useState('')
  const tasksCtx = useContext(TasksContext);
  const tasks = tasksCtx.tasks;

  
  function openModal() {
    setModalIsVisible(true);
  }

  function onItemClick(id) {
    setClickedItemId(id);
    openModal();
  }


  return (
    <>
      <Modal transparent visible={modalIsVisible} animationType="slide">
        <TaskDetails taskId={clickedItemId} />
        <Button title="Close" onPress={() => setModalIsVisible(false)} />
      </Modal>
      <TaskList tasks={tasks} onItemClick={onItemClick} />
    </>
  );
}

