import {useTheme} from '@/context/ThemeContext';
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import styled from 'styled-components';

interface ProfileTextEditProps {
  title: string;
  title2: string;
  onPress: () => void;
  font: string;
}

export const ProfileTextEdit: React.FC<ProfileTextEditProps> = ({
  title,
  title2,
  onPress,
  font,
}) => {
  const {isDarkMode, theme} = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <ProfileEditContainer isDarkMode={isDarkMode}>
        <ProfileEditText isDarkMode={isDarkMode}>{title}</ProfileEditText>
        <LeftContainer>
          <ProfileEditText2 isDarkMode={isDarkMode}>{title2}</ProfileEditText2>
          <Image
            source={require('@/assets/image/rightArrow.png')}
            style={[
              styles.ArrowIcon,
              {tintColor: isDarkMode ? '#FFFFFF' : '#2B2B2B'},
            ]}
          />
        </LeftContainer>
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
  justify-content: flex-end;
  justify-content: space-between;
  flex-direction: row;
  margin: 0 20px;
  border-radius: 10px;
  background: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.text : theme.colors.white};
`;

const LeftContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const ProfileEditText = styled(Text)<{isDarkMode: boolean; theme: any}>`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
  font-family: ${({theme}) => theme.fontFamily};
`;

const ProfileEditText2 = styled(Text)<{isDarkMode: boolean; theme: any}>`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 600;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
  font-family: ${({theme}) => theme.fontFamily};
`;

const styles = StyleSheet.create({
  ArrowIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
});
