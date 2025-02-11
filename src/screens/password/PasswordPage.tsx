import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {changeLanguage, getStoredLanguage} from '@/utils/language';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileEditHader} from '@/components/Header/ProfileEditHader';

export default function PasswordPage() {
  const {t, i18n} = useTranslation();
  const [language, setLanguage] = useState<string>('ko');
  const [font, setFont] = useState<string>('OnggeulipKimkonghae');
  const [nickname, setNickname] = useState<string>('');
  const [changePassword, setChangePassword] = useState<string>('');
  const [checkChangePassword, setCheckChangePassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorMessage2, setErrorMessage2] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isError2, setIsError2] = useState<boolean>(false);

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

  useEffect(() => {
    if (changePassword && checkChangePassword) {
      if (changePassword !== checkChangePassword) {
        setErrorMessage2('비밀번호가 일치하지 않습니다.');
        setIsError2(true);
      } else {
        setErrorMessage2('');
        setIsError2(false);
      }
    }
  }, [changePassword, checkChangePassword]);

  const handleDuplicateCheck = () => {
    if (nickname.length === 0) {
      setErrorMessage('비밀번호 입력해주세요.');
      setIsError(true);
      return;
    }
    const isDuplicate = nickname === '사용불가닉네임';

    if (isDuplicate) {
      setErrorMessage('잘못된 비밀번호입니다.');
    } else {
      setErrorMessage('확인되었습니다.');
      setIsError(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ProfileEditHader
        searchKeyword={t('설정')}
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
      />
      <ScreenContainer fontFamily={font}>
        <InputWrapper>
          <NicknameInputContainer>
            <NicknameInput
              placeholder="현재 비밀번호"
              value={nickname}
              onChangeText={text => {
                setNickname(text);
                setErrorMessage('');
              }}
              placeholderTextColor="#999"
            />
          </NicknameInputContainer>
          <DuplicateCheckButton
            onPress={handleDuplicateCheck}
            isActive={nickname.length > 0}>
            <ButtonText>확인</ButtonText>
          </DuplicateCheckButton>
        </InputWrapper>
        {errorMessage !== '' && (
          <ErrorMessage isError={isError} isError2={isError}>{errorMessage}</ErrorMessage>
        )}

        <InputWrapper>
          <NicknameInputContainer>
            <NicknameInput
              placeholder="비밀번호 변경"
              value={changePassword}
              onChangeText={text => {
                setChangePassword(text);
              }}
              placeholderTextColor="#999"
            />
          </NicknameInputContainer>
        </InputWrapper>

        <InputWrapper>
          <NicknameInputContainer>
            <NicknameInput
              placeholder="비밀번호 재확인"
              value={checkChangePassword}
              onChangeText={text => {
                setCheckChangePassword(text);
              }}
              placeholderTextColor="#999"
            />
          </NicknameInputContainer>
        </InputWrapper>

        {changePassword && checkChangePassword && changePassword !== checkChangePassword && (
          <ErrorMessage isError={false} isError2={true}>비밀번호가 일치하지 않습니다.</ErrorMessage>
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

const ErrorMessage = styled(Text)<{ isError: boolean, isError2: boolean }>`
  color: ${({ isError, isError2 }) => isError ? 'red' : (isError2 ? 'red' : 'green')};
  font-size: 14px;
`;
