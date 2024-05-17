import { StyleSheet, View } from 'react-native';
import Input from './UI/Input';
import DateInput from './UI/DateInput';
import Button from './UI/Button';
import { useContext, useState } from 'react';
import { TasksContext } from '../store/tasks-context';
import { Colors } from '../const/colors';
import TimeInput from './UI/TimeInput';

export default function TaskForm({ onSubmitTask, mode, taskId }) {
  const tasksCtx = useContext(TasksContext);
  const editedTask = tasksCtx.tasks.find((task) => task.id === taskId);

  const [task, onChangeTask] = useState(taskId ? editedTask.task : '');
  const [description, onChangeDescription] = useState(
    taskId ? editedTask.description : ''
  );
  const [date, onChangeDate] = useState(taskId ? editedTask.date : new Date());
  const [time, onChangeTime] = useState(taskId ? editedTask.time : new Date());

  function onSubmit() {
    onSubmitTask(task, description, date, time);
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
      <Input label="Task:" onUpdateValue={onChangeTask} value={task} />
      <Input
        label="Description:"
        onUpdateValue={onChangeDescription}
        value={description}
      />
      <DateInput
        onChangeDate={onChangeDate}
        existingDate={taskId ? editedTask.date : null}
        />
      <TimeInput 
        onChangeTime={onChangeTime}
        existingTime={taskId ? editedTask.time : null}
      />
      <Button title={buttonTitle} onPress={onSubmit} icon={icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.mainBackground,
  },
});
