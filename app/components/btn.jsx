import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const Btn = ({
  style,
  handleClick,
  leading,
  title,
  trailing,
  gradientColors,
}) => {
  return (
    <Pressable onPress={handleClick}>
      <LinearGradient
        style={[styles.btn, style]}
        colors={gradientColors}
        start={gradientStart}
        end={gradientEnd}
      >
        {leading}
        <Text style={[styles.btn.txt, { color: style?.color ?? "#fff" }]}>
          {title}
        </Text>
        {trailing}
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    backgroundColor: "#167BC4",
    borderRadius: 5,
    padding: 8,
    elevation: 4,
    color: "#fff",
    gap: 4,
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
    txt: {
      color: "#fff",
      textAlign: "center",
      margin: 4,
    },
  },
});

export default Btn;
