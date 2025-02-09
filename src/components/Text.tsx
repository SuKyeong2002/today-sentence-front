import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { DefaultTheme, useTheme } from 'styled-components';

export const Text = ({ style, children, fontSize = 'regular', ...props }: TextProps & { fontSize?: keyof DefaultTheme['fontSizes'] }) => {
  const theme = useTheme(); 

  return (
    <RNText {...props} style={[styles.text, { fontFamily: theme.fonts.regular, fontSize: theme.fontSizes[fontSize] }, style]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16, 
  },
});
