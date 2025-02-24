import {View, Text, Alert, Switch} from 'react-native';
import styled from 'styled-components';
import React from 'react';
import {useTheme} from '@/context/ThemeContext';

export const ToggleSettingItem = ({
  title,
  value,
  onToggle,
}: {
  title: string;
  value: boolean;
  onToggle: () => void;
}) => {
  const {isDarkMode, setThemeMode, theme} = useTheme();

  return (
    <Container isDarkMode={isDarkMode}>
      <Row>
        <NewsText isDarkMode={isDarkMode}>{title}</NewsText>
        <ToggleSwitch
          trackColor={{false: '#A9A9A955', true: '#8A715D'}}
          thumbColor="#FFF"
          ios_backgroundColor="#D3D3D3"
          onValueChange={onToggle}
          value={value}
        />
      </Row>
    </Container>
  );
};

const Container = styled(View)<{isDarkMode: boolean}>`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 20px 0 20px;
  padding: 16px;
  border-radius: 10px;
  background: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.text : theme.colors.white};
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const NewsText = styled(Text)<{isDarkMode: boolean; theme: any}>`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
  font-family: ${({theme}) => theme.fontFamily};
`;

const ToggleSwitch = styled(Switch)``;
