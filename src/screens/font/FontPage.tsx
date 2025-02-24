import {View, Text} from 'react-native';
import styled from 'styled-components';
import React, {useState} from 'react';
import BackHeader from '@/components/Header/BackHeader';
import {useTranslation} from 'react-i18next';
import {RadioButton} from 'react-native-paper';
import {useFont} from '@/context/FontContext';
import {useTheme} from '@/context/ThemeContext';

export default function FontPage() {
  const {t} = useTranslation();
  const {selectedFont, setSelectedFont} = useFont();
  const {isDarkMode} = useTheme();

  return (
    <View
      style={{flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA'}}>
      <BackHeader
        searchKeyword={t('설정')}
        onBackPress={() => console.log('뒤로 가기 버튼 클릭됨!')}
        onNotificationPress={() => console.log('알림 버튼 클릭됨!')}
      />
      <Container>
        <FontWrapper isDarkMode={isDarkMode}>
          <FontText isDarkMode={isDarkMode}>기본</FontText>
          <RadioButton
            value="default"
            status={selectedFont === 'default' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedFont('default')}
            color="#8A715D"
          />
        </FontWrapper>
        <FontWrapper isDarkMode={isDarkMode}>
          <FontText
            style={{fontFamily: 'BookendBataanRegular'}}
            isDarkMode={isDarkMode}>
            북엔드 바탕
          </FontText>
          <RadioButton
            value="backend"
            status={selectedFont === 'backend' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedFont('backend')}
            color="#8A715D"
          />
        </FontWrapper>
        <FontWrapper isDarkMode={isDarkMode}>
          <FontText
            style={{fontFamily: 'OnggeulipKimkonghae'}}
            isDarkMode={isDarkMode}>
            온글잎 김콩해
          </FontText>
          <RadioButton
            value="ongeulkim"
            status={selectedFont === 'ongeulkim' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedFont('ongeulkim')}
            color="#8A715D"
          />
        </FontWrapper>
        <FontWrapper isDarkMode={isDarkMode}>
          <FontText
            style={{fontFamily: 'HakgyoansimGeurimilgiTTFR'}}
            isDarkMode={isDarkMode}>
            학교안심 그림일기
          </FontText>
          <RadioButton
            value="schoolsafe"
            status={selectedFont === 'schoolsafe' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedFont('schoolsafe')}
            color="#8A715D"
          />
        </FontWrapper>
        <FontWrapper isDarkMode={isDarkMode}>
          <FontText
            style={{fontFamily: 'OnggeulipWicelist'}}
            isDarkMode={isDarkMode}>
            온글잎 위씨리스트
          </FontText>
          <RadioButton
            value="ongeullist"
            status={selectedFont === 'ongeullist' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedFont('ongeullist')}
            color="#8A715D"
          />
        </FontWrapper>
        <FontWrapper isDarkMode={isDarkMode}>
          <FontText
            style={{fontFamily: 'KyoboHandwriting2020pdy'}}
            isDarkMode={isDarkMode}>
            교보 손글씨 2020 박도연 서체
          </FontText>
          <RadioButton
            value="kyobo"
            status={selectedFont === 'kyobo' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedFont('kyobo')}
            color="#8A715D"
          />
        </FontWrapper>
      </Container>
    </View>
  );
}

// 설정
const Container = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FontWrapper = styled(View)<{isDarkMode: boolean}>`
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  margin: 0 20px;
  background: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.text : theme.colors.white};
`;

const FontText = styled(Text)<{isDarkMode: boolean}>`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
  font-family: ${({theme}) => theme.fontFamily || 'PretendardRegular'};
`;
