import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import TaskDetails from './TaskDetails';

export default function DetailsModal({ taskId, onClose, isVisible }) {
  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose}>
        <TaskDetails taskId={taskId} onClose={onClose} />
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
 
});
