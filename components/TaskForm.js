import { Platform, ScrollView, StyleSheet, View } from 'react-native';
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
    buttonTitle = 'Add';
    icon = 'add';
  } else if (mode === 'edit') {
    buttonTitle = 'Save Changes';
    icon = 'save';
  }

  function addToMyDayHandler() {
    onChangeDate(new Date().toDateString());
  }

  return (
    <>
      <ScrollView style={styles.inputsContainer}>
        <Input label="Task:" onUpdateValue={onChangeTask} value={task} />
        <Input
          label="Description:"
          onUpdateValue={onChangeDescription}
          value={description}
          multiline
        />
        <View style={Platform.OS === 'ios' ? styles.dateTimeContainer : null}>
          <DateInput
            onChangeDate={onChangeDate}
            existingDate={taskId ? editedTask.date : null}
          />
          <TimeInput
            onChangeTime={onChangeTime}
            existingTime={taskId ? editedTask.time : null}
          />
        </View>
        {mode === 'edit' && task.date !== new Date().toDateString() && (
          <Button onPress={addToMyDayHandler} title="Add to My Day" />
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title={buttonTitle}
          onPress={onSubmit}
          icon={icon}
          style={styles.submitButton}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.mainBackground,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 12,
  },
  buttonContainer: {
    backgroundColor: Colors.mainBackground,
  },
  submitButton: {
    paddingVertical: 15,
    marginBottom: 15,
    backgroundColor: '#4027ce',
  },
});
