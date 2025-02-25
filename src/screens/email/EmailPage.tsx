import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {changeLanguage, getStoredLanguage} from '@/utils/language';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileEditHader} from '@/components/Header/ProfileEditHader';
import {useUser} from '@/hooks/useUser';
import {useMutation} from 'react-query';
import {VerifiedEmail} from '@/api/auth';
import {useTheme} from '@/context/ThemeContext';

export default function EmailPage() {
  const {t} = useTranslation();
  const [language, setLanguage] = useState<string>('ko');
  const [font, setFont] = useState<string>('OnggeulipKimkonghae');
  const [email, setEmail] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isError2, setIsError2] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorMessage2, setErrorMessage2] = useState<string>('');
  const [isDuplicateChecked, setIsDuplicateChecked] = useState<boolean>(false);
  const {data: user, isLoading, error} = useUser(); // 유저 정보 조회
  const {isDarkMode, theme} = useTheme();

  useEffect(() => {
    (async () => {
      const storedLang = await getStoredLanguage();
      setLanguage(storedLang);
      changeLanguage(storedLang);
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

  // 이메일 중복 검사
  const emailValidationMutation = useMutation(
    async (email: string) => {
      return await VerifiedEmail(email);
    },
    {
      onSuccess: async response => {
        console.log('이메일 검증 성공:', response);
        setErrorMessage2('사용 가능한 이메일입니다.');
        setIsError2(false);
        setIsDuplicateChecked(true);
        await AsyncStorage.setItem('verifiedEmail', email);
      },
      onError: (error: any) => {
        console.error('이메일 검증 실패:', error.message);
        setErrorMessage2('이미 사용 중인 이메일입니다.');
        setIsError2(true);
        setIsDuplicateChecked(false);
      },
    },
  );

  // 이메일 입력란 공백 확인
  const handleDuplicateCheck = () => {
    if (email.trim().length === 0) {
      setErrorMessage('이메일을 입력해주세요.');
      setIsError(true);
      return;
    }
    emailValidationMutation.mutate(email);
  };

  return (
    <View
      style={{flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA'}}>
      <ProfileEditHader
        searchKeyword={t('설정')}
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        email={email}
        isDuplicateChecked={isDuplicateChecked}
      />
      <ScreenContainer isDarkMode={isDarkMode}>
        <InputWrapper>
          <NicknameInputContainer>
            <NicknameInput
              isDarkMode={isDarkMode}
              placeholder={user?.email || t('변경할 이메일을 입력해주세요.')}
              value={email}
              onChangeText={text => {
                setEmail(text.trimEnd());
                setErrorMessage('');
                setErrorMessage2('');
              }}
              placeholderTextColor="#999"
            />
          </NicknameInputContainer>
          <DuplicateCheckButton
            isDarkMode={isDarkMode}
            onPress={handleDuplicateCheck}
            isActive={email.length > 0}>
            <ButtonText>{t('중복확인')}</ButtonText>
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

const ScreenContainer = styled(View)<{isDarkMode: boolean}>`
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

const NicknameInput = styled(TextInput)<{isDarkMode: boolean; theme: any}>`
  height: 48px;
  border: 1px solid
    ${({isDarkMode, theme}) =>
      isDarkMode ? theme.colors.text : theme.colors.white};
  border-radius: 8px;
  padding: 0 50px 0 12px;
  font-size: 16px;
  text-align: left;
  background-color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.text : theme.colors.white};
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
  font-family: ${({theme}) => theme.fontFamily};
`;

const DuplicateCheckButton = styled(TouchableOpacity)<{
  isActive: boolean;
  isDarkMode: boolean;
}>`
  height: 48px;
  padding: 0 16px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${({isActive, isDarkMode, theme}) =>
    isActive
      ? theme.colors.primary || theme.colors.text
      : isDarkMode
        ? theme.colors.text
        : theme.colors.gray};
`;

const ButtonText = styled(Text)<{theme: any}>`
  color: ${({theme}) => theme.colors.white};
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 600;
  font-family: ${({theme}) => theme.fontFamily};
`;

const ErrorMessage = styled(Text)<{isError: boolean; theme: any}>`
  color: ${({isError}) => (isError ? 'red' : 'green')};
  font-size: 14px;
  font-family: ${({theme}) => theme.fontFamily};
`;

const ErrorMessage2 = styled(Text)<{isError2: boolean; theme: any}>`
  color: ${({isError2}) => (isError2 ? 'red' : 'green')};
  font-size: 14px;
  font-family: ${({theme}) => theme.fontFamily};
`;
