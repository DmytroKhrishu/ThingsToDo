import { Modal, StyleSheet } from "react-native";
import TaskDetails from "../screens/TaskDetails";

export default function DetailsModal({taskId, onClose, isVisible}) {
  

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide"
      style={styles.modal}
      onRequestClose={onClose}
    >
      <TaskDetails taskId={taskId} onClose={onClose} />
    </Modal>
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