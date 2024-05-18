import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import { useState } from 'react';

export default function DateInput({ onChangeDate, existingDate }) {
  const [date, setDate] = useState(
    existingDate ? new Date(existingDate) : new Date()
  );
  const [show, setShow] = useState(false);
  const [displayedDate, setDisplayedDate] = useState(
    existingDate ? existingDate : null
  );

  function onChange(event, selectedDate) {
    const currentDate = selectedDate;
    // console.log(currentDate)
    setShow(false);
    setDate(currentDate);
    onChangeDate(currentDate.toDateString());
    setDisplayedDate(currentDate.toDateString());
  }

  function showDatePicker() {
    setShow(true);
  }

  return (
    <View>
      {(date || displayedDate) && Platform.OS === 'android' && (
        <Text style={styles.text}>Selected date: {displayedDate}</Text>
      )}
      {Platform.OS === 'android' && (
        <Button title="Select Date" onPress={showDatePicker} icon="calendar" />
      )}

      {(Platform.OS === 'ios' || (Platform.OS === 'android' && show)) && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          minimumDate={new Date()}
          mode="date"
          is24Hour={true}
          onChange={onChange}
          themeVariant="dark"
          // style={{ alignSelf: 'flex-start' }}
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
