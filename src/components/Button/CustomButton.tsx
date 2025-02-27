import React from "react";
import { TouchableOpacity, Text, StyleSheet, DimensionValue } from "react-native";

interface LoginButtonProps {
  title: string; 
  width: DimensionValue; 
  onPress: () => void;
}

export default function CustomButton({
  title = "",
  width = "100%",
  onPress,
}: LoginButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, { width }]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    backgroundColor: "#8A715D",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: '600'
  },
});
