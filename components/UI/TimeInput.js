import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import { useState } from 'react';

export default function TimeInput({ onChangeTime, existingTime }) {
  const [time, setTime] = useState();
  const [show, setShow] = useState(false);
  const [displayedTime, setDisplayedTime] = useState(
    existingTime ? existingTime : null
  );

  function onChange(event, selectedDate) {
    const currentTime = selectedDate;
    // console.log(currentDate)
    setShow(false);
    setTime(currentTime);
    onChangeTime(currentTime.toTimeString());
    setDisplayedTime(currentTime.toTimeString());
  }

  function showTimePicker() {
    setShow(true);
  }

  return (
    <View>
      {(time || displayedTime) && (
        <Text style={styles.text}>Selected time: {displayedTime}</Text>
      )}
      <Button title="Select Time" onPress={showTimePicker} icon="time" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="time"
          is24Hour={true}
          onChange={onChange}
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
