import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

interface ProfileEditItemProps {
  title: string;
  onPress: () => void;
}

const ProfileEditItem: React.FC<ProfileEditItemProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ProfileEditContainer>
        <ProfileEditText>{title}</ProfileEditText>
        <SettingImage source={require('@/assets/image/rightArrow.png')} resizeMode="contain" />
      </ProfileEditContainer>
    </TouchableOpacity>
  );
};

export default ProfileEditItem;

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

const ProfileEditText = styled(Text)`
  flex: 1;
  font-size: ${({ theme }) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
`;

const SettingImage = styled(Image)`
  width: 24px;
  height: 24px;
`;
