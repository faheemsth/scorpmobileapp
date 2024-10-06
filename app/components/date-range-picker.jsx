import React, {useState} from 'react';
import {View, Text, Modal, Button, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Btn from './btn';

const DateRangePicker = ({
  isVisible = false, // Control modal visibility via props
  onClose = () => {}, // Callback to close the modal
  onSelectDateRange = ({startDate, endDate}) => {}, // Callback to send selected date range to parent
}) => {
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    endDate: null,
  });

  // Function to handle date selection
  const onDayPress = day => {
    const {dateString} = day;

    if (
      !selectedRange.startDate ||
      (selectedRange.startDate && selectedRange.endDate)
    ) {
      // Reset range if a start date is already set and an end date exists
      setSelectedRange({startDate: dateString, endDate: null});
    } else if (selectedRange.startDate && !selectedRange.endDate) {
      // Set the end date if the start date is selected but end date is not
      if (new Date(dateString) > new Date(selectedRange.startDate)) {
        setSelectedRange(prevState => ({...prevState, endDate: dateString}));
      }
    }
  };

  // Function to generate marking object for range selection
  const getMarkedDates = () => {
    let markedDates = {};

    if (selectedRange.startDate) {
      markedDates[selectedRange.startDate] = {
        startingDay: true,
        color: '#167BC4',
        textColor: 'white',
        borderRadius: 1000,
      };

      if (selectedRange.endDate) {
        let currentDate = new Date(selectedRange.startDate);
        const endDate = new Date(selectedRange.endDate);

        while (currentDate <= endDate) {
          const dateString = currentDate.toISOString().split('T')[0];
          markedDates[dateString] = {
            ...(currentDate === new Date(selectedRange.startDate)
              ? {}
              : {color: '#167BC4', textColor: 'white'}),
            ...(dateString === selectedRange.endDate ? {endingDay: true} : {}),
          };
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    }

    return markedDates;
  };

  // Function to confirm the date selection and close the modal
  const confirmSelection = () => {
    if (onSelectDateRange && selectedRange.startDate && selectedRange.endDate) {
      onSelectDateRange({
        startDate: new Date(selectedRange.startDate),
        endDate: new Date(selectedRange.endDate),
      });
    }
    onClose(); // Close the modal after confirming
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Select Date Range</Text>
          <Calendar
            markingType={'period'}
            markedDates={getMarkedDates()}
            onDayPress={onDayPress}
          />
          <View style={styles.actions}>
            <Btn
              title="Cancel"
              style={{backgroundColor: '#aaa'}}
              handleClick={onClose}
            />
            <Btn title="Confirm" handleClick={confirmSelection} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default DateRangePicker;
