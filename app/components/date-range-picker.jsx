import React, {useState} from 'react';
import {View, Text, Modal, Switch, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Btn from './btn';

const DateRangePicker = ({
  isVisible = false, // Control modal visibility via props
  onClose = () => {}, // Callback to close the modal
  onSelectDateRange = ({startDate, endDate}) => {}, // Callback to send selected date range to parent
  onSelectSingleDate = ({startDate}) => {}, // Callback for single date selection
}) => {
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [singleDate, setSingleDate] = useState(null);
  const [isRangeMode, setIsRangeMode] = useState(false); // Toggle for range/single day mode

  // Function to handle date selection
  const onDayPress = day => {
    const {dateString} = day;

    if (isRangeMode) {
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
    } else {
      // For single date mode
      setSingleDate(dateString);
    }
  };

  // Function to generate marking object for range selection
  const getMarkedDates = () => {
    let markedDates = {};

    if (isRangeMode && selectedRange.startDate) {
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
    } else if (!isRangeMode && singleDate) {
      markedDates[singleDate] = {
        selected: true,
        selectedColor: '#167BC4',
        textColor: 'white',
      };
    }

    return markedDates;
  };

  // Function to confirm the date selection and close the modal
  const confirmSelection = () => {
    if (
      isRangeMode &&
      onSelectDateRange &&
      selectedRange.startDate &&
      selectedRange.endDate
    ) {
      onSelectDateRange({
        startDate: new Date(selectedRange.startDate),
        endDate: new Date(selectedRange.endDate),
      });
    } else if (!isRangeMode && onSelectSingleDate && singleDate) {
      onSelectSingleDate({startDate: new Date(singleDate)});
    }
    onClose(); // Close the modal after confirming
  };

  const changeMode = val => {
    setIsRangeMode(val);
    setSelectedRange({startDate: undefined, endDate: undefined});
    setSingleDate(null);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>
            Select Date{isRangeMode ? ' Range' : ''}
          </Text>
          <View style={styles.switchContainer}>
            <Text>Range Mode</Text>
            <Switch
              value={isRangeMode}
              onValueChange={changeMode}
              thumbColor="#167BC4"
              trackColor="#167BC4"
            />
          </View>
          <Calendar
            markingType={isRangeMode ? 'period' : 'simple'}
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default DateRangePicker;
