import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TaskItem({ task, onClick }) {
  return (
    <View style={styles.itemContainer}>
      <Pressable android_ripple={{color: 'grey'}} onPress={onClick} style={styles.item}>
        <Text style={styles.itemText}>{task.task}</Text>
        <Text style={styles.itemText}>{task.description}</Text>
        <Text style={styles.itemText}>{task.date}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
    borderRadius: 12,
    elevation: 6,
    backgroundColor: 'white',
    overflow: 'hidden'
  },
  item: {
    padding: 10,
  },
  itemText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 5
  },
});
