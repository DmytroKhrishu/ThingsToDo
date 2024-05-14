import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import { useState } from 'react';

export default function DateInput({ onChangeDate, existingDate }) {
  const [date, setDate] = useState();
  const [show, setShow] = useState(false);
  const [displayedDate, setDisplayedDate] = useState(existingDate ? existingDate : null)

  function onChange(event, selectedDate) {
    const currentDate = selectedDate;
    // console.log(currentDate)
    setShow(false);
    setDate(currentDate);
    onChangeDate(currentDate);
    setDisplayedDate(currentDate.toDateString())
  }

  function showDatePicker() {
    setShow(true);
  }

  return (
    <View>
      {(date || displayedDate) && (
        <Text style={styles.text}>Selected date: {displayedDate}</Text>
      )}
      <Button title="Select Date" onPress={showDatePicker} icon="calendar" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date"
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
    color: "white"
  }
})