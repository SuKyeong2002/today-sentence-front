import {View, Text} from 'react-native';
import styled from 'styled-components';
import React from 'react';
import {useTranslation} from 'react-i18next';
import BackHeader from '@/components/Header/BackHeader';

export default function NewsPage() {
  const {t} = useTranslation();

  return (
    <View style={{flex: 1}}>
      <BackHeader
        searchKeyword={t('설정')}
        onBackPress={() => console.log(t('뒤로 가기 버튼 클릭됨!'))}
        onNotificationPress={() => console.log(t('알림 버튼 클릭됨!'))}
      />
      <Container>
        <NewsText>
          {t(
            '공지사항 메뉴가 추가되었습니다. 앞으로 이곳에서 알려드려야 할 사항을 전달드릴 예정입니다. 잘 부탁드립니다 :)',
          )}
        </NewsText>
        <DateText>2025.3.3</DateText>
      </Container>
    </View>
  );
}

const Container = styled(View)`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 20px 12px 20px;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  background: ${({theme}) => theme.colors.white};
`;

const NewsText = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.regular}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.text};
`;

const DateText = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.darkGray};
`;
