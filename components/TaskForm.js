import { StyleSheet, View } from 'react-native';
import Input from './UI/Input';
import DateInput from './UI/DateInput';
import Button from './UI/Button';
import { useContext, useState } from 'react';
import { TasksContext } from '../store/tasks-context';

export default function TaskForm({ onSubmitTask, mode, taskId }) {
  const tasksCtx = useContext(TasksContext);
  const editedTask = tasksCtx.tasks.find((task) => task.id === taskId);

  const [task, onChangeTask] = useState(taskId ? editedTask.task : '');
  const [description, onChangeDescription] = useState(
    taskId ? editedTask.description : ''
  );
  const [date, onChangeDate] = useState(new Date());

  function onSubmit() {
    onSubmitTask(task, description, date);
  }

  let buttonTitle = '';
  let icon = '';

  if (mode === 'add') {
    buttonTitle = 'Add Task';
    icon = 'add';
  } else if (mode === 'edit') {
    buttonTitle = 'Save Changes';
    icon = 'save';
  }

  return (
    <View style={styles.inputsContainer}>
      <Input label="Task:" onChange={onChangeTask} value={task} />
      <Input
        label="Description:"
        onChange={onChangeDescription}
        value={description}
      />
      <DateInput onChangeDate={onChangeDate} existingDate={taskId ? editedTask.date : null} />
      <Button title={buttonTitle} onPress={onSubmit} icon={icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputsContainer: {
    padding: 20,
  },
});
