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
import { deleteAccount } from '@/api/deleteAccount';
import { useDeleteAccount } from '@/hooks/useDeleteAccount';
import { useUser } from '@/hooks/useUser';

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
          title2= {user?.email || t('존재하지 않는 이메일입니다.')}
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

        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}>
          <ModalContainer>
            <ModalContent>
              <ModalText>{t('회원 탈퇴')}</ModalText>
              <SubModalText>{t('정말 계정을 삭제하시겠습니까?')}</SubModalText>
              <ModalButtons>
                <CancelButton onPress={() => setModalVisible(false)}>
                  <ModalButtonText>{t('취소')}</ModalButtonText>
                </CancelButton>
                <ConfirmButton onPress={() => deleteAccount()}>
                  <ModalButtonText>{t('확인')}</ModalButtonText>
                </ConfirmButton>
              </ModalButtons>
            </ModalContent>
          </ModalContainer>
        </Modal>
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

// 모달
const ModalContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled(View)`
  width: 80%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
`;

const ModalButtonText = styled(Text)`
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({theme}) => theme.colors.white};
`;

const ModalText = styled(Text)`
  font-size: 18px;
  margin-bottom: 8px;
`;

const SubModalText = styled(Text)`
  font-size: 14px;
  color: ${({theme}) => theme.colors.darkGray};
  margin-bottom: 20px;
`;

const ModalButtons = styled(View)`
  flex-direction: row;
  gap: 12px;
`;

const CancelButton = styled(TouchableOpacity)`
  width: 45%;
  background-color: ${({theme}) => theme.colors.lightGray};
  padding: 10px 20px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const ConfirmButton = styled(TouchableOpacity)`
  width: 45%;
  padding: 10px 20px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  color: ${({theme}) => theme.colors.white};
  background-color: ${({theme}) => theme.colors.primary};
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
