import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Input({ label, onChange, value }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput onChangeText={onChange} value={value} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 7,
    padding: 6,
    elevation:6
  },
  label: {
    fontSize: 16,
    color: "white"
  }
});
