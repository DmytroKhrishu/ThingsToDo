import { Alert, StyleSheet, View } from 'react-native';
import Input from '../components/UI/Input';
import { useContext, useState } from 'react';
import { TasksContext } from '../store/tasks-context';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/UI/Button';

export default function AddTask() {
  const [task, onChangeTask] = useState('');
  const [description, onChangeDescription] = useState('');
  const [date, onChangeDate] = useState('');

  const navigation = useNavigation();

  const tasksCtx = useContext(TasksContext);

  function addTask() {
    if (task && description && date) {
      const taskItem = {
        task: task,
        description: description,
        date: new Date(date).toDateString(),
      };
      tasksCtx.addTask(taskItem);
      navigation.navigate('Tasks')
    } else {
      Alert.alert('Error', 'Please fill out all fields');
    }
  }

  return (
    <View style={styles.inputsContainer}>
      <Input label="Task:" onChange={onChangeTask} value={task} />
      <Input
        label="Description:"
        onChange={onChangeDescription}
        value={description}
      />
      <Input label="Date:" onChange={onChangeDate} value={date} />
      <Button title="Add Task" onPress={addTask} icon={"add"} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputsContainer: {
    padding: 20,
  },
});
