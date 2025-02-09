import React from 'react';
import styled from 'styled-components';
import {View, Text } from 'react-native';

export default function Title() {

  return (
    <TitleWrapper>
      <TodayDate>12월 10일 화요일</TodayDate>
      <TodayAlert>오늘의 명언이 도착했어요!</TodayAlert>
    </TitleWrapper>
  );
}

const TitleWrapper = styled(View)`
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding: 20px;
  gap: 12px;
`;

// 오늘
const TodayDate = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.xLarge}px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text};
`;

const TodayAlert = styled(Text)`
  font-size: ${({theme}) => theme.fontSizes.small}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.darkGray};
`;