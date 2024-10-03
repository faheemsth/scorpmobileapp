import { View, Text, StyleSheet } from 'react-native'
import React, { forwardRef, useEffect, useRef } from 'react'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFocusEffect } from 'expo-router';

const Bottomsheet = forwardRef((props, ref) => {
  const { children, onChange, style, onClose } = props
  
  return (
    <GestureHandlerRootView style={[styles.container, style]}>
      <BottomSheet
        {...props}
        ref={ref}
        enablePanDownToClose={true}
        enableHandlePanningGesture={true}
        enableDynamicSizing={true}
        animateOnMount={true}
        style={props.sheetStyle}
      >
        <BottomSheetScrollView contentContainerStyle={[styles.contentContainer, style?.contentContainer]}>
          {children}
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 15
  },
});

export default Bottomsheet