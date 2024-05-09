import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, View } from 'react-native';
import Button from './Button';
import { useState } from 'react';

export default function DateInput({onChangeDate}) {
  const [date, setDate] = useState();
  const [show, setShow] = useState(false);

  function onChange(event, selectedDate) {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    onChangeDate(currentDate)
  }

  function showDatePicker() {
    setShow(true);
  }

  return (
    <View>
      <Button title="Select Date" onPress={showDatePicker} icon="calendar" />
      {date && <Text>Selected date: {date.toDateString()}</Text>}
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
