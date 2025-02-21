import {verifyAuthCode} from '@/api/auth';
import {ProfileEditHader} from '@/components/Header/ProfileEditHader';
import {getStoredLanguage} from '@/utils/language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {useMutation} from 'react-query';
import styled from 'styled-components';

export default function AuthenticationPage() {
  const {t, i18n} = useTranslation();
  const [language, setLanguage] = useState<string>('ko');
  const [font, setFont] = useState<string>('OnggeulipKimkonghae');
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isError2, setIsError2] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorMessage2, setErrorMessage2] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const storedLang = await getStoredLanguage();
      setLanguage(storedLang);
      i18n.changeLanguage(storedLang);
    })();
  }, []);

  // 이메일 불러오기 (이메일 중복 확인이 끝난 후)
  useEffect(() => {
    (async () => {
      const storedEmail = await AsyncStorage.getItem('verifiedEmail');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    })();
  }, []);

  const {mutate: verifyCode, isLoading} = useMutation(
    async () => await verifyAuthCode(email, code),
    {
      onSuccess: response => {
        console.log('이메일 인증 성공:', response);
        setErrorMessage2('이메일 인증에 성공하였습니다.');
        setIsError2(false);
        setIsVerified(true);
      },
      onError: (error: any) => {
        console.error('이메일 인증 실패:', error.message);
        setErrorMessage2('잘못된 인증번호입니다.');
        setIsError2(true);
        setIsVerified(false);
      },
    },
  );

  // 인증 코드 검증
  const handleVerifyCode = () => {
    if (code.trim().length === 0) {
      setErrorMessage('이메일 인증코드를 입력해주세요.');
      setIsError(true);
      return;
    }

    verifyCode();
  };

  return (
    <View style={{flex: 1}}>
      <ProfileEditHader
        searchKeyword={t('설정')}
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
      />
      <ScreenContainer>
        <InputWrapper>
          <NicknameInputContainer>
            <NicknameInput
              placeholder="인증번호를 입력해주세요"
              value={code}
              onChangeText={text => {
                setCode(text);
                setErrorMessage('');
              }}
              placeholderTextColor="#999"
            />
          </NicknameInputContainer>

          <DuplicateCheckButton
            onPress={handleVerifyCode}
            isActive={code.length > 0}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <ButtonText>인증완료</ButtonText>
            )}
          </DuplicateCheckButton>
        </InputWrapper>

        {errorMessage !== '' && (
          <ErrorMessage isError={isError}>{errorMessage}</ErrorMessage>
        )}
        {errorMessage2 !== '' && (
          <ErrorMessage2 isError2={isError2}>{errorMessage2}</ErrorMessage2>
        )}
      </ScreenContainer>
    </View>
  );
}

// 스타일 정의
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
  background-color: ${({theme}) => theme.colors.white};
  border: 1px solid ${({theme}) => theme.colors.lightGray};
  border-radius: 8px;
  padding: 0 50px 0 12px;
  font-size: 16px;
  text-align: left;
`;

const DuplicateCheckButton = styled(TouchableOpacity)<{isActive: boolean}>`
  height: 48px;
  padding: 0 16px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${({isActive, theme}) =>
    isActive ? theme.colors.primary || 'brown' : theme.colors.gray};
`;

const ButtonText = styled(Text)`
  color: ${({theme}) => theme.colors.white};
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 600;
`;

const ErrorMessage = styled(Text)<{isError: boolean}>`
  color: ${({isError}) => (isError ? 'red' : 'green')};
  font-size: 14px;
  margin-top: 10px;
`;

const ErrorMessage2 = styled(Text)<{isError2: boolean}>`
  color: ${({isError2}) => (isError2 ? 'red' : 'green')};
  font-size: 14px;
`;
