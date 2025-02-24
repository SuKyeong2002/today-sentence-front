import {View, Text} from 'react-native';
import styled from 'styled-components';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ProfileBackHeader} from '@/components/Header/ProfileBackHeader';
import {useTheme} from '@/context/ThemeContext';

export default function NewsPage() {
  const {t} = useTranslation();
  const {isDarkMode, theme} = useTheme();

  return (
    <View
      style={{flex: 1, backgroundColor: isDarkMode ? '#000000' : '#F8F9FA'}}>
      <ProfileBackHeader
        searchKeyword={t('설정')}
        onBackPress={() => console.log(t('뒤로 가기 버튼 클릭됨!'))}
        onNotificationPress={() => console.log(t('알림 버튼 클릭됨!'))}
      />
      <Container isDarkMode={isDarkMode}>
        <NewsText isDarkMode={isDarkMode}>
          {t(
            '공지사항 메뉴가 추가되었습니다. 앞으로 이곳에서 알려드려야 할 사항을 전달드릴 예정입니다. 잘 부탁드립니다 :)',
          )}
        </NewsText>
        <DateText isDarkMode={isDarkMode}>2025.3.3</DateText>
      </Container>
    </View>
  );
}

const Container = styled(View)<{isDarkMode: boolean}>`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 20px 12px 20px;
  gap: 10px;
  padding: 16px;
  border-radius: 10px;
  background: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.text : theme.colors.white};
  margin-top: 20px;
`;

const NewsText = styled(Text)<{isDarkMode: boolean; theme: any}>`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.white : theme.colors.text};
  font-family: ${({theme}) => theme.fontFamily};
`;

const DateText = styled(Text)<{isDarkMode: boolean; theme: any}>`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 400;
  color: ${({isDarkMode, theme}) =>
    isDarkMode ? theme.colors.lightGray : theme.colors.darkGray};
  font-family: ${({theme}) => theme.fontFamily};
`;
