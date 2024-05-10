import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../const/colors";

export default function AddTaskItem() {
  const navigation = useNavigation()


  return (
    <View style={styles.itemContainer}>
      <Pressable
        android_ripple={{ color: 'grey' }}
        onPress={() => navigation.navigate('AddTask')}
        style={styles.item}
      >
        <Text style={styles.itemText}>+ Add Task</Text>
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
    backgroundColor: Colors.addTaskItem,
    overflow: 'hidden',
  },
  item: {
    padding: 10,
  },
  itemText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 5,
  },
});
