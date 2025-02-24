import React from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {useUser} from '@/hooks/useUser';
import {useTheme} from '@/context/ThemeContext';

export default function Profile() {
  const {t} = useTranslation();
  const {data: user, isLoading, error} = useUser();
  const {isDarkMode} = useTheme();

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#0000ff" />
      </LoadingContainer>
    );
  }

  if (error) {
    return <ErrorText>유저 정보를 불러올 수 없습니다.</ErrorText>;
  }

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
          <ProfileNickname isDarkMode={isDarkMode}>
            {user?.nickname || t('존재하지 않는 닉네임입니다.')}
          </ProfileNickname>
          <ProfileState isDarkMode={isDarkMode}>
            {user?.statusMessage || t('존재하지 않는 상태 메시지입니다.')}
          </ProfileState>
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
`;

const ProfileNickname = styled(Text)<{isDarkMode: boolean}>`
  font-size: ${({theme}) => theme.fontSizes.xLarge}px;
  font-weight: 600;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
`;

const ProfileState = styled(Text)<{isDarkMode: boolean}>`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
`;

// 이미지
const ProfileImage = styled(Image)`
  width: 68px;
  height: 68px;
`;

// 로딩 및 오류 처리
const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled(Text)`
  font-size: 16px;
  color: red;
  text-align: center;
  margin-top: 20px;
`;
