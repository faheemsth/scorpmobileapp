import React, {useRef, useEffect, Children} from 'react';
import {View, Animated, Easing, Text, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({
  size = 100,
  strokeWidth = 10,
  progress = 0.75,
  duration = 1000,
  style = StyleSheet.create({style: {}}).style,
  progressColor = '#7647EB',
  progressBgColor = '#B8B8B885',
  progressRotationOffset = 0,
  children = <></>,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Animate the progress
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [progress]);

  // Interpolate the stroke dash offset
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={[{justifyContent: 'center', alignItems: 'center'}, style]}>
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{transform: [{rotateZ: `${progressRotationOffset}deg`}]}}>
        {/* Background Circle */}
        <Circle
          stroke={progressBgColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Foreground Animated Circle */}
        <AnimatedCircle
          stroke={progressColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference}, ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          width: size,
          height: size,
        }}>
        {children}
      </View>
    </View>
  );
};

export default CircularProgress;
