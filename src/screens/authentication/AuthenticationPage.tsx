import { verifyAuthCode } from '@/api/auth';
import { ProfileEditHader } from '@/components/Header/ProfileEditHader';
import { getStoredLanguage } from '@/utils/language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useMutation } from 'react-query';
import styled from 'styled-components';

export default function AuthenticationPage() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  
  // ✅ 상태 관리
  const [language, setLanguage] = useState<string>('ko');
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [storedEmail, setStoredEmail] = useState<string>('');

  // ✅ 저장된 언어 가져오기
  useEffect(() => {
    (async () => {
      const storedLang = await getStoredLanguage();
      setLanguage(storedLang);
      i18n.changeLanguage(storedLang);
    })();
  }, []);

  // ✅ 저장된 이메일 불러오기
  useEffect(() => {
    (async () => {
      const email = await AsyncStorage.getItem('verifiedEmail');
      if (email) {
        setStoredEmail(email);
        setEmail(email);  // 이메일 상태 업데이트
      }
    })();
  }, []);

  // ✅ 인증 코드 검증 요청
  const { mutate: verifyCode, isLoading } = useMutation(
    async () => await verifyAuthCode(email, code),
    {
      onSuccess: async () => {
        console.log('✅ 이메일 인증 성공');
        setErrorMessage('이메일 인증에 성공하였습니다.');
        setIsError(false);
        setIsVerified(true);
        await AsyncStorage.setItem('isVerified', 'true');
      },
      onError: (error: any) => {
        console.error('❌ 이메일 인증 실패:', error.message);
        setErrorMessage('잘못된 인증번호입니다.');
        setIsError(true);
        setIsVerified(false);
      },
    }
  );

  // ✅ 인증 코드 검증 실행
  const handleVerifyCode = () => {
    if (code.trim().length === 0) {
      setErrorMessage('이메일 인증코드를 입력해주세요.');
      setIsError(true);
      return;
    }
    verifyCode();
  };

  console.log('isVerified: ', isVerified);

  return (
    <View style={{ flex: 1 }}>
      <ProfileEditHader
        searchKeyword={t('설정')}
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        email={email}
        isVerified={isVerified}
        storedEmail={storedEmail}
      />
      <ScreenContainer>
        <InputWrapper>
          <NicknameInputContainer>
            <NicknameInput
              placeholder="인증번호를 입력해주세요"
              value={code}
              onChangeText={(text) => {
                setCode(text);
                setErrorMessage('');
              }}
              placeholderTextColor="#999"
            />
          </NicknameInputContainer>

          <DuplicateCheckButton
            onPress={handleVerifyCode}
            isActive={code.length > 0}  
            disabled={isVerified}  
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <ButtonText>인증완료</ButtonText>
            )}
          </DuplicateCheckButton>
        </InputWrapper>

        {errorMessage !== '' && <ErrorMessage isError={isError}>{errorMessage}</ErrorMessage>}
      </ScreenContainer>
    </View>
  );
}

// ✅ 스타일 정리
const ScreenContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 0 16px;
`;

const InputWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin-top: 20px;
`;

const NicknameInputContainer = styled(View)`
  position: relative;
  flex: 1;
`;

const NicknameInput = styled(TextInput)`
  height: 48px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
  padding: 0 50px 0 12px;
  font-size: 16px;
  text-align: left;
`;

const DuplicateCheckButton = styled(TouchableOpacity)<{
  isActive: boolean;
  disabled: boolean;
}>`
  height: 48px;
  padding: 0 16px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${({ isActive, disabled, theme }) =>
    disabled
      ? theme.colors.gray
      : isActive
      ? theme.colors.primary
      : theme.colors.gray};
`;

const ButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.regular}px;
  font-weight: 600;
`;

const ErrorMessage = styled(Text)<{ isError: boolean }>`
  color: ${({ isError }) => (isError ? 'red' : 'green')};
  font-size: 14px;
  margin-top: 10px;
`;
