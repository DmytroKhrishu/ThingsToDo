import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Button({ title, icon, iconSize, onPress, style }) {
  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable
        style={styles.button}
        android_ripple={{ color: 'white' }}
        onPress={onPress}
      >
        <Ionicons name={icon} size={iconSize ? iconSize : 18} color="white" />
        {title && <Text style={styles.buttonText}>{title}</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 8,
    backgroundColor: 'blue',
    overflow: 'hidden',
    borderRadius: 8,
    elevation: 6,
  },
  button: {
    flexDirection: 'row',
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 12,
  },
});
