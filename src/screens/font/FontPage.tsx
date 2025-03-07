import { ProfileBackHeader } from '@/components/Header/ProfileBackHeader';
import { useFont } from '@/context/FontContext';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import styled from 'styled-components';

export default function FontPage() {
  const {t} = useTranslation();
  const {selectedFont, setSelectedFont} = useFont();
  const {isDarkMode} = useTheme();

  const fonts = [
    {label: '기본', value: 'Pretendard-Regular'},
    {label: '북엔드 바탕', value: 'BookendBataanRegular'},
    {label: '온글잎 김콩해', value: 'OnggeulipKimkonghae'},
    {label: '학교안심 그림일기', value: 'HakgyoansimGeurimilgiTTFR'},
    {label: '온글잎 위씨리스트', value: 'OnggeulipWicelist'},
    {label: '교보 손글씨 2020 박도연', value: 'KyoboHandwriting2020pdy'},
  ];

  console.log('selectedFont: ', selectedFont);

  return (
    <View
      style={{flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA'}}>
     <ProfileBackHeader searchKeyword={t('설정')} />
      <Container>
        {fonts.map((font, index) => (
          <FontWrapper key={index} isDarkMode={isDarkMode}>
            <FontText style={{fontFamily: font.value}} isDarkMode={isDarkMode}>
              {font.label}
            </FontText>
            <RadioButton
              value={font.value}
              status={selectedFont === font.value ? 'checked' : 'unchecked'}
              onPress={() => setSelectedFont(font.value)}
              color="#8A715D"
            />
          </FontWrapper>
        ))}
        <AlertText isDarkMode={isDarkMode}>
          ⚠️ 폰트 변경 시 로그아웃됩니다. 로그인 후 적용됩니다. ⚠️
        </AlertText>
      </Container>
    </View>
  );
}

// 스타일 설정
const Container = styled(View)`
  flex-direction: column;
  gap: 12px;
`;

const FontWrapper = styled(View)<{isDarkMode: boolean}>`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  border-radius: 10px;
  margin: 0 20px;
  background: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.text : theme.colors.white};
`;

const FontText = styled(Text)<{isDarkMode: boolean}>`
  font-family: ${({theme}) => theme.fontFamily};
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
`;

const AlertText = styled(Text)<{isDarkMode: boolean}>`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
  text-align: center;
  margin-top: 10px;
`;
