import {verifiedNickName} from '@/api/auth';
import {ProfileEditHader} from '@/components/Header/ProfileEditHader';
import {useTheme} from '@/context/ThemeContext';
import {useUser} from '@/hooks/useUser';
import {getStoredLanguage} from '@/utils/language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useMutation} from 'react-query';
import styled from 'styled-components';

export default function NicknamePage() {
  const {t, i18n} = useTranslation();
  const [language, setLanguage] = useState<string>('ko');
  const [font, setFont] = useState<string>('OnggeulipKimkonghae');
  const [nickname, setNickname] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isError2, setIsError2] = useState<boolean>(false);
  const [errorMessage2, setErrorMessage2] = useState<string>('');
  const [isDuplicateChecked, setIsDuplicateChecked] = useState<boolean>(false);
  const {data: user, isLoading, error} = useUser(); // 유저 정보 조회

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

  // 닉네임 중복 검사
  const nicknameValidationMutation = useMutation(
    async (nickname: string) => {
      return await verifiedNickName(nickname);
    },
    {
      onSuccess: response => {
        console.log('닉네임 검증 성공:', response);
        setErrorMessage2('사용 가능한 닉네임입니다.');
        setIsError2(false);
        setIsDuplicateChecked(true);
      },
      onError: (error: any) => {
        console.error('닉네임 검증 실패:', error.message);
        setErrorMessage2('이미 사용 중인 닉네임입니다.');
        setIsError2(true);
        setIsDuplicateChecked(false);
      },
    },
  );

  // 닉네임 입력란 공백 확인
  const handleDuplicateCheck = async () => {
    if (nickname.trim().length === 0) {
      setErrorMessage('닉네임을 입력해주세요.');
      setIsError(true);
      return;
    }
    nicknameValidationMutation.mutate(nickname);
  };

  const {isDarkMode, theme} = useTheme();

  return (
    <View
      style={{flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA'}}>
      <ProfileEditHader
        searchKeyword={t('프로필 편집')}
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        nickname={nickname}
        isDuplicateChecked={isDuplicateChecked}
      />
      <ScreenContainer fontFamily={font}>
        <InputWrapper>
          <NicknameInputContainer>
            <NicknameInput
              isDarkMode={isDarkMode}
              placeholder={user?.nickname || t('닉네임을 입력해주세요.')}
              value={nickname}
              onChangeText={text => {
                setNickname(text.trimEnd());
                setErrorMessage('');
                setErrorMessage2('');
              }}
              placeholderTextColor="#999"
              maxLength={8}
            />
            <CharacterCount>{`${nickname.length}/8`}</CharacterCount>
          </NicknameInputContainer>
          <DuplicateCheckButton
            isDarkMode={isDarkMode}
            onPress={handleDuplicateCheck}
            isActive={nickname.length > 0}>
            <ButtonText>중복확인</ButtonText>
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

const NicknameInput = styled(TextInput)<{isDarkMode: boolean; theme: any}>`
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
  font-family: ${({theme}) => theme.fontFamily};
`;

const CharacterCount = styled(Text)<{theme: any}>`
  position: absolute;
  right: 12px;
  top: 50%;
  margin-top: -8px;
  font-size: 14px;
  color: ${({theme}) => theme.colors.text};
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
