import React from 'react';
import { View, StyleSheet } from 'react-native';

const CustomComponent = ({ style, children }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor:"#ccc",
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor:'#FFFFFF'
  },
});

export default CustomComponent;
