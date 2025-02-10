import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import styled from 'styled-components';

interface SettingItemProps {
  title: string;
  onPress: () => void;
  iconSource?: ImageSourcePropType; 
}

export const SettingItem: React.FC<SettingItemProps> = ({ title, onPress, iconSource }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ProfileEditContainer>
        {iconSource && <SettingIcon source={iconSource} resizeMode="contain" />}
        <ProfileEditText>{title}</ProfileEditText>
      </ProfileEditContainer>
    </TouchableOpacity>
  );
};

// 스타일
const ProfileEditContainer = styled(View)`
  width: 90%;
  display: flex;
  padding: 16px;
  align-items: center;
  flex-direction: row;
  margin: 0 20px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white};
`;

const SettingIcon = styled(Image)`
  width: 24px;
  height: 24px;
  margin-right: 12px; 
`;

const ProfileEditText = styled(Text)`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
`;
