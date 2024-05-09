import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TaskItem({ task, onClick }) {
  return (
    <View style={styles.item}>
      <Pressable android_ripple={{color: 'grey'}} onPress={onClick}>
        <Text style={styles.itemText}>id: {task.id}</Text>
        <Text style={styles.itemText}>{task.task}</Text>
        <Text style={styles.itemText}>{task.description}</Text>
        <Text style={styles.itemText}>{task.date}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    margin: 10,
    borderRadius: 7,
    elevation: 6,
    backgroundColor: 'white',
  },
  itemText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
