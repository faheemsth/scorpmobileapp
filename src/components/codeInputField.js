import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

const CodeInputField = () => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    return (
        <SafeAreaView style={styles.root}>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}
                    >
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
            <Text style={styles.resendText}>
                Don't have a code? <Text style={styles.resendLink}>Re-send</Text>
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1, padding: 15, paddingHorizontal: 5 },
    codeFieldRoot: { marginTop: 20, marginHorizontal: 2 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderBottomWidth: 3,
        borderColor: '#00000030',
        textAlign: 'center',
        color: 'black',
    },
    focusCell: {
        borderColor: '#000',
    },
    resendText: {
        fontSize: 16,
        color: 'black',
        marginTop: 10,
    },
    resendLink: {
        textDecorationLine: 'underline',
        fontWeight: '600',
    },
});

export default CodeInputField;
