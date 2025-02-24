import {CheckedPassword} from '@/api/auth';
import {ProfileEditHader} from '@/components/Header/ProfileEditHader';
import {useTheme} from '@/context/ThemeContext';
import {getStoredLanguage} from '@/utils/language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useMutation} from 'react-query';
import styled from 'styled-components';

export default function PasswordPage() {
  const {t} = useTranslation();
  const [language, setLanguage] = useState<string>('ko');
  const [font, setFont] = useState<string>('OnggeulipKimkonghae');
  const [password, setPassword] = useState<string>('');
  const [changePassword, setChangePassword] = useState<string>('');
  const [checkChangePassword, setCheckChangePassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorMessage2, setErrorMessage2] = useState<string>('');
  const [errorMessage3, setErrorMessage3] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isError2, setIsError2] = useState<boolean>(false);
  const [isError3, setIsError3] = useState<boolean>(false);
  const [isDuplicateChecked, setIsDuplicateChecked] = useState<boolean>(false);

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

  useEffect(() => {
    if (changePassword && checkChangePassword) {
      if (changePassword !== checkChangePassword) {
        setErrorMessage3('비밀번호가 일치하지 않습니다.');
        console.log(changePassword, checkChangePassword);
        setIsError3(true);
      } else {
        setErrorMessage3('');
        setIsError3(false);
      }
    }
  }, [changePassword, checkChangePassword]);

  // 비밀번호 일치 여부 확인
  const passwordCheckMutation = useMutation(
    async (password: string) => {
      return await CheckedPassword(password);
    },
    {
      onSuccess: response => {
        console.log('비밀번호 일치 여부 확인 성공:', response);
        setErrorMessage2('확인되었습니다.');
        setIsError2(false);
        setIsDuplicateChecked(true);
      },
      onError: (error: any) => {
        console.error('비밀번호 일치 여부 확인 실패:', error.message);
        setErrorMessage2('잘못된 비밀번호입니다.');
        setIsError2(true);
        setIsDuplicateChecked(false);
      },
    },
  );

  // 비밀번호 확인
  const handleDuplicateCheck = () => {
    if (password.length === 0) {
      setErrorMessage('비밀번호를 입력해주세요.');
      setIsError(true);
      return;
    }
    passwordCheckMutation.mutate(password);
  };

  const {isDarkMode} = useTheme();

  return (
    <View
      style={{flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA'}}>
      <ProfileEditHader
        searchKeyword={t('설정')}
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        changePassword={changePassword}
        checkChangePassword={checkChangePassword}
        isDuplicateChecked={isDuplicateChecked}
        isError3={isError3}
      />
      <ScreenContainer fontFamily={font}>
        <InputWrapper>
          <NicknameInputContainer>
            <NicknameInput
              isDarkMode={isDarkMode}
              placeholder={t("현재 비밀번호")}
              value={password}
              onChangeText={text => {
                setPassword(text);
                setErrorMessage('');
              }}
              placeholderTextColor="#999"
              secureTextEntry
            />
          </NicknameInputContainer>
          <DuplicateCheckButton
            isDarkMode={isDarkMode}
            onPress={handleDuplicateCheck}
            isActive={password.length > 0}>
            <ButtonText>{t("확인")}</ButtonText>
          </DuplicateCheckButton>
        </InputWrapper>
        {errorMessage !== '' && (
          <ErrorMessage isError={isError}>{errorMessage}</ErrorMessage>
        )}
        {errorMessage2 !== '' && (
          <ErrorMessage2 isError2={isError2}>{errorMessage2}</ErrorMessage2>
        )}

        <InputWrapper>
          <NicknameInputContainer>
            <NicknameInput
              isDarkMode={isDarkMode}
              placeholder={t("비밀번호 변경")}
              value={changePassword}
              onChangeText={text => {
                setChangePassword(text);
              }}
              placeholderTextColor="#999"
              secureTextEntry
            />
          </NicknameInputContainer>
        </InputWrapper>

        <InputWrapper>
          <NicknameInputContainer>
            <NicknameInput
              isDarkMode={isDarkMode}
              placeholder={t("비밀번호 재확인")}
              value={checkChangePassword}
              onChangeText={text => {
                setCheckChangePassword(text);
              }}
              placeholderTextColor="#999"
              secureTextEntry
            />
          </NicknameInputContainer>
        </InputWrapper>

        {errorMessage3 !== '' && (
          <ErrorMessage3 isError3={isError3}>{errorMessage3}</ErrorMessage3>
        )}

        {/* {changePassword &&
          changePassword !== checkChangePassword && (
            <ErrorMessage2 isError2={isError2}>{errorMessage2}</ErrorMessage2>
          )} */}
      </ScreenContainer>
    </View>
  );
}

// 스타일
const ScreenContainer = styled(View)<{fontFamily: string}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 0 16px;
  font-family: ${props => props.fontFamily};
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

const NicknameInput = styled(TextInput)<{isDarkMode: boolean}>`
  height: 48px;
  background-color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.text : theme.colors.white};
  border: 1px solid
    ${({isDarkMode, theme}) =>
      isDarkMode ? theme.colors.text : theme.colors.lightGray};
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
  border-radius: 8px;
  padding: 0 50px 0 12px;
  font-size: 16px;
  text-align: left;
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

const ButtonText = styled(Text)`
  color: ${({theme}) => theme.colors.white};
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 600;
`;

const ErrorMessage = styled(Text)<{isError: boolean}>`
  color: ${({isError}) => (isError ? 'red' : 'green')};
  font-size: 14px;
`;

const ErrorMessage2 = styled(Text)<{isError2: boolean}>`
  color: ${({isError2}) => (isError2 ? 'red' : 'green')};
  font-size: 14px;
`;

const ErrorMessage3 = styled(Text)<{isError3: boolean}>`
  color: ${({isError3}) => (isError3 ? 'red' : 'green')};
  font-size: 14px;
`;
