import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {changeLanguage, getStoredLanguage} from '@/utils/language';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileTextEdit} from '@/components/Button/ProfileTextEdit';
import {ProfileBackHeader} from '@/components/Header/ProfileBackHeader';
import {deleteAccount} from '@/api/deleteAccount';
import {useDeleteAccount} from '@/hooks/useDeleteAccount';
import {useUser} from '@/hooks/useUser';
import CustomModal from '@/components/Modal/CustomModal';

type RootStackParamList = {
  Nickname: undefined;
  Introduction: undefined;
  Login: undefined;
  Email: undefined;
  Password: undefined;
};

export default function AccountPage() {
  const {t, i18n} = useTranslation();
  const [language, setLanguage] = useState<string>('ko');
  const [font, setFont] = useState<string>('OnggeulipKimkonghae');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const {mutate: deleteAccount} = useDeleteAccount();
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

  const handleDeleteAccount = () => {
    deleteAccount();
    setModalVisible(false);
  };

  type NavigationProp = StackNavigationProp<RootStackParamList, 'Nickname'>;

  return (
    <View style={{flex: 1}}>
      <ProfileBackHeader
        searchKeyword={t('설정')}
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
      />
      <ScreenContainer fontFamily={font}>
        <ProfileTextEdit
          title={t('이메일 변경')}
          title2={user?.email || t('존재하지 않는 이메일입니다.')}
          onPress={() => navigation.navigate('Email')}
          font={font}
        />
        <ProfileTextEdit
          title={t('비밀번호 재설정')}
          title2={t('')}
          onPress={() => navigation.navigate('Password')}
          font={font}
        />

        <DeleteAccountButton onPress={() => setModalVisible(true)}>
          <ButtonText>{t('계정 삭제하기')}</ButtonText>
        </DeleteAccountButton>

        <CustomModal
          visible={modalVisible}
          title={t('회원탈퇴')}
          message={t('정말 계정을 삭제하시겠습니까?')}
          leftButton={t('취소')}
          rightButton={t('확인')}
          onConfirm={handleDeleteAccount}
          onCancel={() => setModalVisible(false)}
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

const DeleteAccountButton = styled(TouchableOpacity)`
  margin-top: 10px;
  align-items: center;
  width: 100%;
`;

const ButtonText = styled(Text)`
  color: ${({theme}) => theme.colors.red};
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
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
