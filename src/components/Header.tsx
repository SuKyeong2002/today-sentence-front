import React from "react";
import { View, StyleSheet, Image } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.leftIcon}>
        <Image source={require('../assets/image/LOGO2.png')} style={styles.logoImage}/>
      </View>

      <View style={styles.rightIcon}>
        <Image source={require('../assets/image/notification.png')} style={styles.logoImage}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    backgroundColor: "#fff", 
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0", 
  },
  leftIcon: {
    flex: 1,
  },
  title: {
    flex: 3,
    fontSize: 18,
    fontWeight: "bold",
    color: "#5A403D", 
    textAlign: "center",
  },
  rightIcon: {
    flex: 1,
    alignItems: "flex-end",
  },
  logoImage: {
    width : 20,
    height: 20,
  },
});
