import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import BackHeader from '@/components/Header/BackHeader';
import { useTranslation } from 'react-i18next';
import { RadioButton } from 'react-native-paper';
import { useFont } from '@/context/FontContext';
import { useTheme } from '@/context/ThemeContext';

export default function FontPage() {
  const { t } = useTranslation();
  const { selectedFont, setSelectedFont } = useFont();
  const { isDarkMode } = useTheme();

  const fonts = [
    { label: '기본', value: 'Pretendard-Regular' },
    { label: '북엔드 바탕', value: 'BookendBataanRegular' },
    { label: '온글잎 김콩해', value: 'OnggeulipKimkonghae' },
    { label: '학교안심 그림일기', value: 'HakgyoansimGeurimilgiTTFR' },
    { label: '온글잎 위씨리스트', value: 'OnggeulipWicelist' },
    { label: '교보 손글씨 2020 박도연', value: 'KyoboHandwriting2020pdy' },
  ];

  console.log("selectedFont: ", selectedFont);

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA' }}>
      <BackHeader searchKeyword={t('설정')} />
      <Container>
        {fonts.map((font, index) => (
          <FontWrapper key={index} isDarkMode={isDarkMode}>
            <FontText style={{ fontFamily: font.value }} isDarkMode={isDarkMode}>
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
      </Container>
    </View>
  );
}

// 스타일 설정
const Container = styled(View)`
  flex-direction: column;
  gap: 12px;
`;

const FontWrapper = styled(View)<{ isDarkMode: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  border-radius: 10px;
  margin: 0 20px;
  background: ${({ isDarkMode, theme }) =>
    isDarkMode ? theme.colors.text : theme.colors.white};
`;

const FontText = styled(Text)<{ isDarkMode: boolean }>`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.fontSizes.regular}px;
  color: ${({ isDarkMode, theme }) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
`;
