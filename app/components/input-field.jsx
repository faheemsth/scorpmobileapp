import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Pressable,
} from 'react-native';

const InputField = ({
  style,
  leading,
  secureTextEntry,
  placeholder,
  value,
  onChange,
  trailing,
  multiline,
  isBottomSheet,
  readonly = false,
  lines= 1,
}) => {
  const ref = useRef();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.iconedTextField, style]}>
        {leading}
        {!!isBottomSheet ?? false ? (
          <BottomSheetTextInput
            ref={ref}
            multiline={multiline ?? false}
            secureTextEntry={secureTextEntry}
            style={[
              styles.iconedTextField.inputField,
              !!multiline
                ? styles.textAlignTopVertical
                : styles.textAlignCenterVertical,
            ]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            readOnly={readonly}
          />
        ) : readonly ? (
          <Pressable
            onPress={()=>onChange?.()}
            style={[
              styles.iconedTextField.inputField,
              !!multiline
                ? styles.textAlignTopVertical
                : styles.textAlignCenterVertical,
              {color: "#D0D0D0"},
              style?.fieldStyle,
            ]}>
            <Text>{value}</Text>
          </Pressable>
        ) : (
          <TextInput
            ref={ref}
            multiline={multiline ?? false}
            secureTextEntry={secureTextEntry}
            style={[
              styles.iconedTextField.inputField,
              !!multiline
                ? styles.textAlignTopVertical
                : styles.textAlignCenterVertical,
              style?.fieldStyle,
            ]}
            placeholder={placeholder}
            placeholderTextColor="#D0D0D0"
            numberOfLines={lines}
            value={value}
            onChangeText={onChange}
            readOnly={readonly}
          />
        )}
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
      height: '100%',
    },
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    padding: 15.5,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#A0A0A0",
    
  },
  textAlignTopVertical: {
    textAlignVertical: 'top',
  },
  textAlignCenterVertical: {
    textAlignVertical: 'center',
  },
});

export default InputField;
