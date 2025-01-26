import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
};

export default function NotFoundPage({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 Not Found!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});