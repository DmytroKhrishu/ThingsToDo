import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../const/colors';

export default function TaskItem({ task, onClick }) {
  let taskDescription = '';
  if (task.description.length >= 25) {
    taskDescription = task.description.substring(0, 25) + '...';
  } else {
    taskDescription = task.description;
  }

  return (
    <View style={styles.itemContainer}>
      <Pressable
        android_ripple={{ color: 'grey' }}
        onPress={onClick}
        style={styles.item}
      >
        <Text
          style={[
            styles.title,
            { textDecorationLine: task.isCompleted ? 'line-through' : null },
          ]}
        >
          {task.task}
        </Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.text}>{taskDescription}</Text>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.text}>{task.date}</Text>
            <Text style={styles.text}>{task.time}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    margin: 8,
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
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  dateTimeContainer: {
    padding: 5,
  },
  text: {
    color: 'white',
  },
});
