import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import { useState } from 'react';

export default function DateInput({
  onChangeDate,
  onChangeTime,
  existingDate,
  existingTime,
}) {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [displayedDate, setDisplayedDate] = useState(
    existingDate ? existingDate : null
  );
  const [displayedTime, setDisplayedTime] = useState(
    existingTime ? existingTime : null
  );

  function onChangeDate(event, selectedDate) {
    const currentDate = selectedDate;
    setShowDate(false);
    // console.log(date)
    setDate(currentDate);
    onChangeDate(currentDate);
    setDisplayedDate(currentDate.toDateString());
  }

  function onChangeTime(event, selectedTime) {
    const currentTime = selectedTime;
    setShowTime(false);
    // console.log(currentTime)
    setTime(currentTime);
    onChangeTime(currentTime);
    setDisplayedTime(currentTime.toTimeString());
  }

  function showDatePicker() {
    setShowDate(true);
  }

  function showTimePicker() {
    setShowTime(true);
  }

  return (
    <View>
      {(date || displayedDate) && (
        <Text style={styles.text}>Selected date: {displayedDate}</Text>
      )}
      {(time || displayedTime) && (
        <Text style={styles.text}>Selected time: {displayedTime}</Text>
      )}
      <View style={styles.dateTimeContainer}>
        <Button title="Select Date" onPress={showDatePicker} icon="calendar" />
        <Button title="Select Time" onPress={showTimePicker} icon="time" />
        {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            minimumDate={new Date()}
            mode="date"
            is24Hour={true}
            onChange={onChangeDate}
          />
        )}
        {showTime && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode="time"
            is24Hour={true}
            onChange={onChangeTime}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'white',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
