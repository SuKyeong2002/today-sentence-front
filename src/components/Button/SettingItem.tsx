import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components';

interface SettingItemProps {
  title: string;
  onPress: () => void;
  iconSource?: ImageSourcePropType;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  title,
  onPress,
  iconSource,
}) => {
  const {isDarkMode, theme} = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <ProfileEditContainer isDarkMode={isDarkMode}>
        {iconSource && <Image source={iconSource} style={[styles.settingIcon, { tintColor: isDarkMode ? '#FFFFFF' : '#2B2B2B' }]} />}
        <ProfileEditText isDarkMode={isDarkMode} style={{ fontFamily: theme.fontFamily }}>{title}</ProfileEditText>
      </ProfileEditContainer>
    </TouchableOpacity>
  );
};

// 스타일
const ProfileEditContainer = styled(View)<{isDarkMode: boolean}>`
  width: 90%;
  display: flex;
  padding: 16px;
  align-items: center;
  flex-direction: row;
  margin: 0 20px;
  border-radius: 10px;
  background: ${({ isDarkMode, theme }) => 
    isDarkMode ? theme.colors.text : theme.colors.white };
`;

const styles = StyleSheet.create({
  settingIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
});

const ProfileEditText = styled(Text)<{isDarkMode: boolean}>`
  flex: 1;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
`;
