import { Pressable, StyleSheet, Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Colors } from '../../const/colors';
import { useContext } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TasksContext } from '../../store/tasks-context';
import Button from '../UI/Button';

export default function TaskItem({ task, onClick }) {
  const tasksCtx = useContext(TasksContext);

  function toggleComplete() {
    if (task.isCompleted) {
      tasksCtx.uncompleteTask(task.id);
    } else {
      tasksCtx.completeTask(task.id);
    }
  }

  function renderRightActions() {
    return (
      <Button
        onPress={() => tasksCtx.deleteTask(task.id)}
        icon="trash"
        iconSize={25}
        style={styles.deleteTaskContainer}
      />
    );
  }

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions} overshootFriction={8}>
        <View style={styles.itemContainer}>
          <Pressable
            android_ripple={{ color: 'grey' }}
            onPress={onClick}
            style={styles.item}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Checkbox
                value={task.isCompleted}
                onValueChange={toggleComplete}
                style={{ marginHorizontal: 15 }}
              />
              <View>
                <Text
                  style={[
                    styles.title,
                    {
                      textDecorationLine: task.isCompleted
                        ? 'line-through'
                        : null,
                    },
                  ]}
                >
                  {task.task}
                </Text>

                <View style={styles.dateTimeContainer}>
                  <Text style={styles.text}>{task.date}</Text>
                  <Text> </Text>
                  <Text style={styles.text}>{task.time.slice(0, 5)}</Text>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 12,
    elevation: 6,
    backgroundColor: Colors.itemBackground,
    overflow: 'hidden',
  },
  item: {
    padding: 8,
  },
  title: {
    textAlignVertical: 'center',
    padding: 8,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  text: {
    color: 'white',
  },
  deleteTaskContainer: {
    marginVertical: 8,
    marginRight: 15,
    borderRadius: 12,
    elevation: 6,
    backgroundColor: 'red',
    overflow: 'hidden',
    justifyContent: 'center',
    width: 60
  },
});
