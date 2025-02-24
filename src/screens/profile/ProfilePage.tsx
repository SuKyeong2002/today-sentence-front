import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage, getStoredLanguage } from '@/utils/language';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileTextEdit } from '@/components/Button/ProfileTextEdit';
import { ProfileBackHeader } from '@/components/Header/ProfileBackHeader';
import { useUser } from '@/hooks/useUser';
import { useQueryClient } from 'react-query';
import { useTheme } from '@/context/ThemeContext';

type RootStackParamList = {
  Nickname: undefined;
  Introduction: undefined;
};

export default function ProfilePage() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>('ko');
  const [font, setFont] = useState<string>('OnggeulipKimkonghae');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Nickname'>>();
  const queryClient = useQueryClient();
  const { data: user, isLoading, error } = useUser(); // 유저 정보 조회
  const { isDarkMode, setThemeMode } = useTheme();

  // 언어 설정 및 폰트 설정 
  useEffect(() => {
    (async () => {
      const storedLang = await getStoredLanguage();
      setLanguage(storedLang);
      i18n.changeLanguage(storedLang);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const storedFont = await AsyncStorage.getItem('selectedFont');
      if (storedFont) {
        setFont(storedFont);
      }
    })();
  }, []);

  // 닉네임 변경 후 데이터 다시 불러오기
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      queryClient.invalidateQueries('user'); 
    });

    return unsubscribe;
  }, [navigation, queryClient]);

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
    <View style={{ flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA' }}>
      <ProfileBackHeader
        searchKeyword={t('설정')}
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
      />

      <ProfileWrapper>
        <ProfileImageContainer>
          <ProfileImage source={require('@/assets/image/profileUser.png')} resizeMode="contain" />
        </ProfileImageContainer>
        <ProfileImgText fontFamily={font}>{t('프로필 이미지')}</ProfileImgText>
      </ProfileWrapper>

      <ScreenContainer fontFamily={font}>
        <ProfileTextEdit
          title={t('닉네임')}
          title2={user?.nickname || t('존재하지 않는 닉네임입니다.')}
          onPress={() => navigation.navigate('Nickname')}
          font={font}
        />
        <ProfileTextEdit
          title={t('자기소개')}
          title2={user?.statusMessage || t('존재하지 않는 상태 메시지입니다.')}
          onPress={() => navigation.navigate('Introduction')}
          font={font}
        />
      </ScreenContainer>
    </View>
  );
}

// 스타일 
const ScreenContainer = styled(View)<{ fontFamily: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-top: 24px;
  font-family: ${(props) => props.fontFamily};
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
  background: #fff;
`;

const ProfileWrapper = styled(View)`
  display: flex;
  width: 100%;
  padding: 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const ProfileImgText = styled(Text)<{ fontFamily: string }>`
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.blue};
`;

const ProfileImage = styled(Image)`
  width: 68px;
  height: 68px;
`;

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
