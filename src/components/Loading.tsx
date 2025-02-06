import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

export default function CustomLoading() {
  const rotateValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 1000, 
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const rotateAnimation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circleContainer, { transform: [{ rotate: rotateAnimation }] }]}>
        {Array.from({ length: 8 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { opacity: index / 8 + 0.3 }, 
            ]}
          />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  circleContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#666",
    borderRadius: 4,
    position: "absolute",
  },
});
