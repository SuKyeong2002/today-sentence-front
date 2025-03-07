import {Alert, View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {changeLanguage, getStoredLanguage} from '@/utils/language';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileEditHader} from '@/components/Header/ProfileEditHader';
import {useUser} from '@/hooks/useUser';
import {useTheme} from '@/context/ThemeContext';

type RootStackParamList = {
  Nickname: undefined;
};

export default function IntroductionaPage() {
  const {t, i18n} = useTranslation();
  const [language, setLanguage] = useState<string>('ko');
  const [font, setFont] = useState<string>('OnggeulipKimkonghae');
  const [message, setMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
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

  type NavigationProp = StackNavigationProp<RootStackParamList, 'Nickname'>;

  const {isDarkMode, theme} = useTheme();

  return (
    <View
      style={{flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA'}}>
      <ProfileEditHader
        searchKeyword={t('프로필 편집')}
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        message={message}
      />
      <ScreenContainer fontFamily={font}>
        <InputWrapper>
          <NicknameInputContainer>
            <NicknameInput
              isDarkMode={isDarkMode}
              placeholder={
                user?.statusMessage || t('상태메시지를 입력해주세요.')
              }
              value={message}
              onChangeText={text => {
                setMessage(text);
                setErrorMessage('');
              }}
              placeholderTextColor="#999"
              maxLength={50}
            />
            <CharacterCount>{`${message.length}/50`}</CharacterCount>
          </NicknameInputContainer>
        </InputWrapper>

        {errorMessage !== '' && (
          <ErrorMessage isError={isError}>{errorMessage}</ErrorMessage>
        )}
      </ScreenContainer>
    </View>
  );
}

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
  text-align-vertical: top;
  display: flex;
  height: 150px;
  padding: 10px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 90px;
  font-family: ${({theme}) => theme.fontFamily};
`;

const CharacterCount = styled(Text)<{theme: any}>`
  position: absolute;
  right: 12px;
  bottom: 12px;
  margin-top: 30%;
  font-size: 14px;
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fontFamily};
`;

const ErrorMessage = styled(Text)<{isError: boolean; theme: any}>`
  color: ${({theme}) => theme.colors.text};
  font-size: 14px;
  font-family: ${({theme}) => theme.fontFamily};
`;
