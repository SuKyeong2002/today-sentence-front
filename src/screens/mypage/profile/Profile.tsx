import React from 'react';
import {View, Text, Image} from 'react-native';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

export default function Profile() {
  const {t} = useTranslation();

  return (
    <>
      <ProfileContainer>
        <ProfileImageContainer>
          <ProfileImage
            source={require('@/assets/image/profileUser.png')}
            resizeMode="contain"
          />
        </ProfileImageContainer>
        <ProfileTextContainer>
          <ProfileNickname>{t('명언 좀도둑')}</ProfileNickname>
          <ProfileState>{t('상태 메시지를 입력해주세요.')}</ProfileState>
        </ProfileTextContainer>
      </ProfileContainer>
    </>
  );
}

const ProfileContainer = styled(View)`
  width: 90%;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  margin: 20px 20px 24px 20px;
  gap: 24px;
`;

const ProfileTextContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
  align-self: stretch;
`;

const ProfileImageContainer = styled(View)`
  display: flex;
  width: 60px;
  height: 60px;
  padding: 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50px;
  border: 3px solid ${({theme}) => theme.colors.darkGray};
  background: #fff;
`;

const ProfileNickname = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.xLarge}px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.text};
`;

const ProfileState = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text};
`;

// 이미지
const ProfileImage = styled(Image)`
  width: 44px;
  height: 44px;
`;
