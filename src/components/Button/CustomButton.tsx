import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
}

export default function CustomButton({ title, onPress }: CustomButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    width: 310,
    height: 58,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 8,
    backgroundColor: '#8A715D',
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Pretendard Variable',
    fontSize: 18,
    fontWeight: '600',
  },
});
