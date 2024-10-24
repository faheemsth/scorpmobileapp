import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from 'react-native';
const SearchableDropdown = ({
  data = [], // Data array is passed via props
  placeholder = 'Search...', // Placeholder for the input field
  restrictToList = false, // Restriction based on whether user can enter custom values
  onItemSelected, // Callback when an item is selected
}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Set default text and filtered data when `data` changes
  useEffect(() => {
    if (data.length > 0) {
      setSearchText(data[0]?.name || '');
      setFilteredData(data);
    }
  }, [data]); // Only run this effect when `data` changes

  // Filter data based on search text
  const filterData = text => {
    setSearchText(text);
    if (text) {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredData(filtered);
      setDropdownVisible(true); // Show the dropdown when typing
    } else {
      setFilteredData(data); // Reset to full list when input is cleared
      setDropdownVisible(false); // Hide dropdown when cleared
    }
  };

  const handleSelect = item => {
    setSearchText(item.name);
    setDropdownVisible(false); // Hide dropdown when an item is selected
    if (onItemSelected) {
      onItemSelected(item); // Call the callback with the selected item
    }
  };

  const handleChangeText = text => {
    filterData(text);
    if (!restrictToList) {
      setSearchText(text); // Let user enter their own value if restriction is off
    }
  };

  return (
    <View style={styles.container}>
      {/* Text Input for search */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={searchText}
        onChangeText={text => handleChangeText(text)}
        onFocus={() => setDropdownVisible(true)}
        onBlur={() => setDropdownVisible(false)}
      />

      {/* Dropdown list */}
      {dropdownVisible && filteredData.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          renderItem={({item}) => (
            <TouchableWithoutFeedback
              key={item.id}
              onPress={() => handleSelect(item)}>
              <Text style={styles.item}>{item.name}</Text>
            </TouchableWithoutFeedback>
          )}
          style={styles.dropdown}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
  input: {
    fontFamily: 'outfit-400',
    borderColor: '#7647EB',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: 36,
    zIndex: 1,
  },
  dropdown: {
    fontFamily: 'outfit-400',
    borderColor: '#7647EB',
    borderWidth: 1,
    position: 'absolute', // Absolutely positioned
    top: 50, // Adjust the top based on the position of your TextInput
    left: 0,
    right: 0,
    zIndex: 1000, // Ensure it appears on top of other elements
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  item: {
    fontFamily: 'outfit-400',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#7647EB',
  },
});

export default SearchableDropdown;
