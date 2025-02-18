import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

export default function Title() {
  const { t } = useTranslation();
  const [todayDate, setTodayDate] = useState('');

  // 오늘 날짜 함수 (년, 월, 일, 요일)
  const getTodayDate = (local: string) => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    return new Intl.DateTimeFormat(local, options).format(date);
  };

  // 언어 변환 (한국어 -> 영어)
  useEffect(() => {
    setTodayDate(getTodayDate(i18n.language));
  }, [i18n.language]);

  return (
    <TitleWrapper>
      <TodayDate>{t(todayDate)}</TodayDate>
      <TodayAlert>💌 {t('오늘의 명언이 도착했어요!')}</TodayAlert>
    </TitleWrapper>
  );
}

// 스타일 
const TitleWrapper = styled(View)`
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding: 20px;
  gap: 12px;
`;

const TodayDate = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.xLarge}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const TodayAlert = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkGray};
`;
