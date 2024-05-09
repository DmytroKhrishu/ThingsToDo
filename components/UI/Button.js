import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Button({ title, icon, onPress }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} android_ripple={{color: "white"}} onPress={onPress}>
        <Ionicons name={icon} size={18} color="white" />
       {title && <Text style={styles.buttonText}>{title}</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 12,
    backgroundColor: 'blue',
    overflow: 'hidden',
    borderRadius: 8,
    elevation: 6
  },
  button: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 12
  },
});
