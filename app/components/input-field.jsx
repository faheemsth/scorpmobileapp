import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const InputField = ({
  style,
  leading,
  secureTextEntry,
  placeholder,
  value,
  onChange,
  trailing,
  multiline,
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.iconedTextField, style]}>
        {leading}
        <TextInput
          multiline={multiline ?? false}
          secureTextEntry={secureTextEntry}
          style={styles.iconedTextField.inputField}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
        />
        {trailing}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  iconedTextField: {
    inputField: {
      paddingHorizontal: 8,
      flexGrow: 1,
      height: "100%",
      textAlignVertical: "top",
    },
    overflow: "scroll",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#167BC4",
    marginHorizontal: 10,
  },
});

export default InputField;
