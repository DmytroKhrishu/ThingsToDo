import { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TasksContext } from '../store/tasks-context';

export default function TaskDetails({ taskId, onClose }) {
  const tasksCtx = useContext(TasksContext);
  const task = tasksCtx.tasks.find((task) => task.id === taskId);

  function onDeleteTask(){
    tasksCtx.deleteTask(taskId)
    onClose();
  }

  return (
    <View style={styles.detailsContainer}> 
      <Text style={styles.text}>{task.task}</Text>
      <Text style={styles.text}>{task.description}</Text>
      <Text style={styles.text}>{task.date}</Text>
      <Button title="Delete Task" onPress={onDeleteTask} />
      <Button title="Close" onPress={onClose} />
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
    borderRadius: 8
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    margin: 5
  }
})