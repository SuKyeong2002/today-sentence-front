import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
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
  return (
    <TouchableOpacity onPress={onPress}>
      <ProfileEditContainer>
        <ProfileEditText fontFamily={font}>{title}</ProfileEditText>
        <LeftContainer>
          <ProfileEditText2 fontFamily={font}>{title2}</ProfileEditText2>
          <ArrowImage
            source={require('@/assets/image/rightArrow.png')}
            resizeMode="contain"
          />
        </LeftContainer>
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
  justify-content: flex-end;
  justify-content: space-between;
  flex-direction: row;
  margin: 0 20px;
  border-radius: 10px;
  background: ${({theme}) => theme.colors.white};
`;

const LeftContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const ProfileEditText = styled(Text)<{fontFamily: string}>`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text};
`;

const ProfileEditText2 = styled(Text)<{fontFamily: string}>`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.text};
`;

const ArrowImage = styled(Image)`
  width: 24px;
  height: 24px;
`;
