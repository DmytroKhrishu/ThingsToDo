import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import { useState } from 'react';

export default function TimeInput({ onChangeTime, existingTime }) {
  const [time, setTime] = useState(
     new Date()
  );
  const [show, setShow] = useState(false);
  const [displayedTime, setDisplayedTime] = useState(
    existingTime ? existingTime.slice(0, 5) : null
  );

  function onChange(event, selectedDate) {
    const currentTime = selectedDate;
    setShow(false);
    setTime(currentTime);
    onChangeTime(currentTime.toTimeString());
    setDisplayedTime(currentTime.toTimeString().slice(0, 5));
  }

  function showTimePicker() {
    setShow(true);
  }

  return (
    <View>
      {displayedTime && Platform.OS === 'android' && (
        <Text style={styles.text}>Selected time: {displayedTime}</Text>
      )}
      {Platform.OS === 'android' && (
        <Button title="Select Time" onPress={showTimePicker} icon="time" />
      )}

      {(Platform.OS === 'ios' || (Platform.OS === 'android' && show)) && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode="time"
          is24Hour={true}
          onChange={onChange}
          themeVariant="dark"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'white',
  },
});
