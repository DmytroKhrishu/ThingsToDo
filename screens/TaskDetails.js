import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TasksContext } from '../store/tasks-context';
import Button from '../components/UI/Button';
import { useNavigation } from '@react-navigation/native';

export default function TaskDetails({ taskId, onClose }) {
  const tasksCtx = useContext(TasksContext);
  const task = tasksCtx.tasks.find((task) => task.id === taskId);

  const taskIsComplete = task.isCompleted;

  const navigation = useNavigation();

  function onDeleteTask() {
    tasksCtx.deleteTask(taskId);
    onClose();
  }

  function onCompleteTask() {
    tasksCtx.completeTask(taskId);
    onClose();
  }

  function onUncompleteTask() {
    tasksCtx.uncompleteTask(taskId);
    onClose();
  }

  function onEditTask() {
    navigation.navigate('EditTask', { id: taskId });
    onClose();
  }

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.text}>{task.task}</Text>
      <Text style={styles.text}>{task.description}</Text>
      <Text style={styles.text}>{task.date}</Text>
      {taskIsComplete ? (
        <Button
          title="Un-complete task"
          icon="return-down-back"
          onPress={onUncompleteTask}
        />
      ) : (
        <Button
          title="Task Complete"
          icon="checkmark"
          onPress={onCompleteTask}
        />
      )}
      <Button title="Edit Task" icon="pencil" onPress={onEditTask} />
      <Button title="Delete Task" icon="trash-bin" onPress={onDeleteTask} />
      <Button title="Close" icon="close" onPress={onClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 15,
    margin: 20,
    marginTop: 150,
    backgroundColor: 'white',
    elevation: 8,
    borderRadius: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    margin: 5,
  },
});
