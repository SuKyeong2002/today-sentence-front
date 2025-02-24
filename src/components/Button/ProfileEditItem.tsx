import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import styled from 'styled-components';
import {useTheme} from '@/context/ThemeContext';

interface ProfileEditItemProps {
  title: string;
  onPress: () => void;
  font: string;
}

const ProfileEditItem: React.FC<ProfileEditItemProps> = ({
  title,
  onPress,
  font,
}) => {
  const {isDarkMode, theme} = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <ProfileEditContainer isDarkMode={isDarkMode}>
        <ProfileEditText isDarkMode={isDarkMode}>{title}</ProfileEditText>
        <Image
          source={require('@/assets/image/rightArrow.png')}
          style={[
            styles.backIcon,
            {tintColor: isDarkMode ? '#FFFFFF' : '#2B2B2B'},
          ]}
        />
      </ProfileEditContainer>
    </TouchableOpacity>
  );
};

export default ProfileEditItem;

// 스타일
const ProfileEditContainer = styled(View)<{isDarkMode: boolean}>`
  width: 90%;
  display: flex;
  padding: 16px;
  align-items: center;
  flex-direction: row;
  margin: 0 20px;
  border-radius: 10px;
  background: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.text : theme.colors.white};
`;

const ProfileEditText = styled(Text)<{isDarkMode: boolean; theme: any}>`
  flex: 1;
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
  font-family: ${({theme}) => theme.fontFamily};
`;

const styles = StyleSheet.create({
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
