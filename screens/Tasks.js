import { useContext, useState } from 'react';
import TaskList from '../components/TasksOutput/TaskList';
import { TasksContext } from '../store/tasks-context';
import { Button, Modal, StyleSheet } from 'react-native';
import TaskDetails from './TaskDetails';

export default function Tasks() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [clickedItemId, setClickedItemId] = useState('');
  const tasksCtx = useContext(TasksContext);
  const tasks = tasksCtx.tasks;

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
      <Modal
        transparent
        visible={modalIsVisible}
        animationType="slide"
        style={styles.modal}
        onRequestClose={closeModal}
      >
        <TaskDetails taskId={clickedItemId} onClose={closeModal} />
      </Modal>
      <TaskList tasks={tasks} onItemClick={onItemClick} />
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 35,
    padding: 20,
  },
});
