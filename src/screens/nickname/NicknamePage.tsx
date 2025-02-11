import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {changeLanguage, getStoredLanguage} from '@/utils/language';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileEditHader} from '@/components/Header/ProfileEditHader';

export default function NicknamePage() {
  const {t, i18n} = useTranslation();
  const [language, setLanguage] = useState<string>('ko');
  const [font, setFont] = useState<string>('OnggeulipKimkonghae');
  const [nickname, setNickname] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

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

  const handleDuplicateCheck = () => {
    if (nickname.length === 0) {
      setErrorMessage('닉네임을 입력해주세요.');
      setIsError(true);
      return;
    }

    const isDuplicate = nickname === '사용불가닉네임';

    if (isDuplicate) {
      setErrorMessage('이미 사용 중인 닉네임입니다.');
      setIsError(true);
    } else {
      setErrorMessage('사용 가능한 닉네임입니다.');
      setIsError(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ProfileEditHader
        searchKeyword={t('프로필 편집')}
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
      />
      <ScreenContainer fontFamily={font}>
        <InputWrapper>
          <NicknameInputContainer>
            <NicknameInput
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChangeText={text => {
                setNickname(text);
                setErrorMessage('');
              }}
              placeholderTextColor="#999"
              maxLength={8}
            />
            <CharacterCount>{`${nickname.length}/8`}</CharacterCount>
          </NicknameInputContainer>
          <DuplicateCheckButton
            onPress={handleDuplicateCheck}
            isActive={nickname.length > 0}>
            <ButtonText>중복확인</ButtonText>
          </DuplicateCheckButton>
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

const NicknameInput = styled(TextInput)`
  height: 48px;
  background-color: ${({theme}) => theme.colors.white};
  border: 1px solid ${({theme}) => theme.colors.lightGray};
  border-radius: 8px;
  padding: 0 50px 0 12px;
  font-size: 16px;
  text-align: left;
`;

const CharacterCount = styled(Text)`
  position: absolute;
  right: 12px;
  top: 50%;
  margin-top: -8px;
  font-size: 14px;
  color: ${({theme}) => theme.colors.text};
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
`;
