import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';

const List = ({options, onPress}) => {
  console.log(options);
  return (
    <FlatList
      data={options}
      keyExtractor={item => item.value}
      scrollEnabled={true}
      renderItem={({item, index}) => (
        <>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => onPress(item, index)}>
            <Text style={styles.optionText}>{item.label}</Text>
            {item.selected && (
              <View style={{position: "absolute", right: 20, top: 15}}>
                <Svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d="M16 1.26174L5.02857 12L0 7.0783L1.28914 5.81656L5.02857 9.46756L14.7109 0L16 1.26174Z"
                    fill="black"
                  />
                </Svg>
              </View>
            )}
          </TouchableOpacity>
        </>
      )}
    />
  );
};

export default List;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
  },
  optionText: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 5,
  },
});
