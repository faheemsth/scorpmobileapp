import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SearchableDropdown = ({
  data = [{id: 0, name: "None"}],               // Data array is passed via props
  placeholder = "Search...", // Placeholder for the input field
  restrictToList = false,   // Restriction based on whether user can enter custom values
  onItemSelected,           // Callback when an item is selected
}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(()=>{
    console.log("setting default text")
    setSearchText(data?.[0]?.name)
    setFilteredData(data)
  },[])

  // Filter data based on search text
  const filterData = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = data.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
      setFilteredData(filtered);
      setDropdownVisible(true); // Show the dropdown when typing
    } else {
      setDropdownVisible(true); // Hide dropdown if text is cleared
      setFilteredData(data)
    }
  };

  const handleSelect = (item) => {
    setSearchText(item.name);
    setDropdownVisible(false); // Hide dropdown when an item is selected
    if (onItemSelected) {
      onItemSelected(item);    // Call the callback with the selected item
    }
  };

  const handleChangeText = (text) => {
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
        onChangeText={(text) => handleChangeText(text)}
        onFocus={()=>setDropdownVisible(true)}
        onBlur={()=>setDropdownVisible(false)}
      />

      {/* Dropdown list */}
      {dropdownVisible && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
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
    borderColor: '#167BC4',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: 36,
  },
  dropdown: {
    borderColor: '#167BC4',
    borderWidth: 1,
    position: 'absolute',  // Absolutely positioned
    top: 50,               // Adjust the top based on the position of your TextInput
    left: 0,
    right: 0,
    zIndex: 1000,          // Ensure it appears on top of other elements
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,           // For Android shadow
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#167BC4',
  },
});

export default SearchableDropdown;