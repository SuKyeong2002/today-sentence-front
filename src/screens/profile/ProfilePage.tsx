import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {changeLanguage, getStoredLanguage} from '@/utils/language';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileTextEdit} from '@/components/Button/ProfileTextEdit';
import { ProfileBackHeader } from '@/components/Header/ProfileBackHeader';
import { useUser } from '@/hooks/useUser';

type RootStackParamList = {
  Nickname: undefined;
  Introduction: undefined;
  
};

export default function ProfilePage() {
  const {t, i18n} = useTranslation();
  const [language, setLanguage] = useState<string>('ko');
  const [font, setFont] = useState<string>('OnggeulipKimkonghae');
  const navigation = useNavigation<NavigationProp>();
  const {data: user, isLoading, error} = useUser();

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

  useEffect(() => {
    (async () => {
      const storedLang = await getStoredLanguage();
      setLanguage(storedLang);
      i18n.changeLanguage(storedLang);
    })();
  }, []);

  const handleLanguageChange = async (lang: string) => {
    await changeLanguage(lang);
    setLanguage(lang);
  };

  const handleFontChange = async (selectedFont: string) => {
    await AsyncStorage.setItem('selectedFont', selectedFont);
    setFont(selectedFont);
  };

  useEffect(() => {
    (async () => {
      const storedFont = await AsyncStorage.getItem('selectedFont');
      if (storedFont) {
        setFont(storedFont);
      }
    })();
  }, []);

  type NavigationProp = StackNavigationProp<RootStackParamList, 'Nickname'>;

  return (
    <View style={{flex: 1}}>
      <ProfileBackHeader
        searchKeyword={t('설정')}
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
      />

      <ProfileWrapper>
        <ProfileImageContainer>
          <ProfileImage
            source={require('@/assets/image/profileUser.png')}
            resizeMode="contain"
          />
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

const ScreenContainer = styled(View)<{fontFamily: string}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-top: 24px;
  font-family: ${props => props.fontFamily};
`;

// 프로필
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

const ProfileImgText = styled(Text)<{fontFamily: string}>`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.blue};
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
